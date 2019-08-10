import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Axiosのリクエストで発火する例外インターフェース
 * @export
 * @interface IAxiousHttpError
 */
export interface IAxiousHttpError extends Error {
    config?: AxiosRequestConfig;
    isAxiousError?: boolean;
    request?: XMLHttpRequest;
    response?: AxiosResponse<any>;
    stack?: string;
    toJson(): string;
}
