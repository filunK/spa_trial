
/**
 * process.envをtype safeで設定を参照するクラスです。
 *
 * また、process.envに関わらない定数を管理します。
 *
 * @export
 * @class Env
 */
export class Env {

    private static env: Env;
    private constructor() {}

    /**
     * シングルトンインスタンスを取得
     *
     * @readonly
     * @static
     * @type {Env}
     * @memberOf Env
     */
    public static get Instance(): Env {

        if (!this.env ) {
            this.env = new Env();
        }
        return this.env;
    }

    /**
     * 環境変数
     * NODE_ENV
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get NodeEnv(): string {

        if (process.env.NODE_ENV === undefined) {
            return '';
        } else {
            return process.env.NODE_ENV;
        }
    }

    /**
     * 環境変数
     * VUE_APP_API_BASE_URI
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get ApiBaseUri(): string {
        if (process.env.VUE_APP_API_BASE_URI === undefined) {
            return '';
        } else {
            return process.env.VUE_APP_API_BASE_URI;
        }
    }

    /**
     * 環境変数
     * VUE_APP_DATASOURCE
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get DataSourceName(): string {
        if (process.env.VUE_APP_DATASOURCE === undefined) {
            return '';
        } else {
            return process.env.VUE_APP_DATASOURCE;
        }
    }

    /**
     * APIバージョン
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get ApiVersionUri(): string {
        return '/api/v1';
    }

    /**
     * API ログイン
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get LoginApiUri(): string {
        return '/authentication/login';
    }

    /**
     * API ログイン確認
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get LoginConfirmUri(): string {
        return '/authentication/confirm';
    }

    /**
     * API リフレッシュトークン取得
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get RefreshUri(): string {
        return '/authentication/refresh';
    }

    /**
     * API ユーザ登録
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get RegistUserUri(): string {
        return '/authentication/registration';
    }

    public get SearchBookUri(): string {
        return '/book/googleBook';
    }

    /**
     * ローカルストレージのキー情報
     */
    public get Storage(): IStorage {
        return {
            AccessTokenKey : 'A_TKN',
            RefreshTokenKey : 'R_TKN',
        };
    }


    public get QueryStringKies(): IQueryStringKies {
        return {
            RedirectTo: 'redirect',
        };
    }

    /**
     * クリップボード操作可能要素のクラス名
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get ClipboardableClassName(): string{
        return '.clipboardable';
    }

}


/**
 * ローカルストレージのキー情報
 * @export
 * @interface IStorage
 */
export interface IStorage {
    AccessTokenKey: string;
    RefreshTokenKey: string;
}

export interface IQueryStringKies {
    RedirectTo: string;
}
