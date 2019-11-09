import Axios, { AxiosRequestConfig } from 'axios';

import {LoginRequest} from '@/models/apiModels/V1/LoginRequest';
import {LoginResponse} from '@/models/apiModels/V1/LoginResponse';
import { RefreshRequest } from '@/models/apiModels/V1/RefreshRequest';
import {RegistRequest} from '@/models/apiModels/V1/RegistRequest';
import {RegistResponse} from '@/models/apiModels/V1/RegistResponse';

import {Env} from '@/utils/Env';
import { DexieContext } from '@/dataAccess/DexieContext';
import { IAxiousHttpError } from '@/exceptions/IAxiousHttpError';
import { TokenStorage } from '@/dataAccess/tableModel/TokenStorage';

export class Auth {

    /**
     * ログインAPIを呼び出します。
     * @static
     * @param {LoginRequest} model
     * @returns {Promise<LoginResponse>}
     *
     * @memberOf Auth
     */
    public static async Login(model: LoginRequest): Promise<LoginResponse> {

        // ログインAPIのURI
        const loginApi = Env.Instance.ApiBaseUri + Env.Instance.ApiVersionUri + Env.Instance.LoginApiUri;

        try {
            const response = await Axios.post<LoginResponse>(loginApi, model);

            return response.data;
        } catch (error) {

            throw error;
        }
    }

    /**
     * ログイン確認APIを呼び出します。
     * @static
     * @returns {Promise<boolean>}
     *
     * @memberOf Auth
     */
    public static async IsLoggedIn(): Promise<boolean> {

        const confirmApi = Env.Instance.ApiBaseUri + Env.Instance.ApiVersionUri + Env.Instance.LoginConfirmUri;

        const db = new DexieContext();
        let judge: boolean = false;
        try {
            const userInfo = await db.GetUserInfo();
            const header = await Auth.CreateBearerHeader();
            const response = await Axios.get(confirmApi, header);

            if (response.status === 200) {
                console.log('IsLoggedIn: OK- ConfirmAPI-200');
                judge = true;
            } else {
                console.log('IsLoggedIn: NO- ConfirmAPI-2xx');
                judge = false;
            }

        } catch (error) {
            const axiousError = error as IAxiousHttpError;
            // 401以外は認証失敗とみなす
            if (axiousError.response) {
                if (axiousError.response.status !== 401) {
                    console.log('IsLoggedIn: NO- ConfirmAPI- 40X');
                    judge = false;
                }
                // 401である場合はリフレッシュトークン取得
                console.log('IsLoggedIn: PROCESSED- ConfirmAPI- 401');

                // IndexedDBから情報を取得する。
                try {
                    const token = await db.GetTokens(Env.Instance.Storage.RefreshTokenKey);

                    const model = new RefreshRequest();
                    if (token) {
                        model.RefreshToken = token;
                    }

                    // API呼び出し
                    const refreshApi = Env.Instance.ApiBaseUri + Env.Instance.ApiVersionUri + Env.Instance.RefreshUri;
                    try {
                        const response = await Axios.put<LoginResponse>(refreshApi, model);

                        const accessToken = new TokenStorage(
                            Env.Instance.Storage.AccessTokenKey,
                            response.data.token,
                        );
                        const refreshToken = new TokenStorage(
                            Env.Instance.Storage.RefreshTokenKey,
                            response.data.refresh,
                        );

                        try {
                            db.SaveTokens([
                                accessToken,
                                refreshToken,
                            ]);
                            console.log('IsLoggedIn: OK- SAVE REFRESH');

                            judge = true;
                        } catch (error) {
                            console.log('IsLoggedIn: NO- SAVE REFRESH');
                            console.error(error);
                            judge = false;
                        }

                    } catch (error) {
                        console.log('IsLoggedIn: NO- RefreshAPI- not 200');
                        judge = false;
                    }

                } catch (error) {
                    console.log('IsLoggedIn: NO- Get Tokens');
                    judge = false;
                }

            } else {
                console.log('IsLoggedIn: NO- Error Instanse doest not have  response property');
                judge = false;

            }
        }

        // ログイン状態をほかから参照できるようUserInfoCollectionを更新する。
        try {
            const userInfo = await db.GetUserInfo();
            if (userInfo) {
                userInfo.IsLoggedIn = judge;
                await db.SaveUserInfo(userInfo);
            } else {
                await db.SaveUserInfo({
                    UserId: '',
                    IsLoggedIn: judge,
                });
            }
        } catch (error) {
            judge = false;
        }

        return judge;
    }

    /**
     * ユーザ登録APIを実行します。
     * @param model
     */
    public static async Regist(model: RegistRequest): Promise<RegistResponse> {

        const registUri = Env.Instance.ApiBaseUri + Env.Instance.ApiVersionUri + Env.Instance.RegistUserUri;

        try {
            const response = await Axios.post<RegistResponse>(registUri, model);

            return response.data;
        } catch (error) {

            throw error;
        }

    }

    /**
     * ヘッダに対してJWTを付与します。
     * @static
     * @returns {Promise<AxiosRequestConfig>}
     *
     * @memberOf Auth
     */
    public static async CreateBearerHeader(): Promise<AxiosRequestConfig> {

        const db = new DexieContext();

        const token = await db.GetTokens(Env.Instance.Storage.AccessTokenKey);

        return {
            headers: {
                Authorization: `Bearer ${token ? token : ''}`,
            },
        };

    }
}
