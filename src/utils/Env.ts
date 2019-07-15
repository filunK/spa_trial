
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
    private Env() {}

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
     * API ログイン系
     *
     * @readonly
     * @type {string}
     * @memberOf Env
     */
    public get LoginApiUri(): string {
        return '/Login';
    }

}