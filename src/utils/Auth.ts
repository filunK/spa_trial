import Axios from "axios";

import {LoginRequest} from "@/models/apiModels/V1/LoginRequest";
import {LoginResponse} from "@/models/apiModels/V1/LoginResponse";
import {Env} from "@/utils/Env";

export class Auth {

    public static async Login(model: LoginRequest): Promise<LoginResponse> {

        // ログインAPIのURI
        const loginApi = Env.Instance.ApiBaseUri + Env.Instance.ApiVersionUri + Env.Instance.LoginApiUri;

        try {
            const response = await Axios.post<LoginResponse>(loginApi,model);

            return response.data;
        } catch (error) {

            throw new Error(error);
        }
    }

    public static async IsLoggedIn(): Promise<void> {

    }



    private registToStorage(tokens: LoginResponse) {
        
    }
}