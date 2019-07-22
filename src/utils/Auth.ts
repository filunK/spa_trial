import Axios, { AxiosRequestConfig } from "axios";

import {LoginRequest} from "@/models/apiModels/V1/LoginRequest";
import {LoginResponse} from "@/models/apiModels/V1/LoginResponse";
import {Env} from "@/utils/Env";
import { DexieContext } from '@/dataAccess/DexieContext';

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
            const response = await Axios.post<LoginResponse>(loginApi,model);

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

        try{
            const header = await Auth.CreateBearerHeader();
            console.log(header);
            const response = await Axios.get(confirmApi, header)

            if (response.status === 200) {
                return true;
            } else {
                return false;
            }

        }catch (error) {
            // 401などのエラー
            return false;
        }

    }

    /**
     * ヘッダに対してJWTを付与します。
     * @private
     * @static
     * @returns {Promise<AxiosRequestConfig>} 
     * 
     * @memberOf Auth
     */
    private static async CreateBearerHeader(): Promise<AxiosRequestConfig> {

        const db = new DexieContext();

        const token = await db.GetTokens(Env.Instance.Storage.AccessTokenKey);

        return {
            headers: {
                Authorization: `Bearer ${token? token: ''}`
            }
        }

    }
}