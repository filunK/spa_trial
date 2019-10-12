
// バリデーションのルールをまとめたクラス
export class Rules {

    /**
     * 必須入力のルール
     *
     * @static
     *
     * @memberOf Rules
     */
    public static RequiredRule: (t: string) => boolean | string =  (val) => !!val || '必須項目です';

    /**
     * ユーザ名のルール
     *
     * @static
     *
     * @memberOf Rules
     */
    public static UsernameRule: (t: string) => boolean | string = (val: string) => {
        const regex = /^[a-zA-Z\d]{8,100}$/;
        return  regex.test(val) || 'ユーザ名は８〜100文字の半角英数字である必要があります';
    }

    /**
     * パスワードのルール
     *
     * @static
     *
     * @memberOf Rules
     */
    public static PasswordRule: (t: string) => boolean | string  = (val: string) => {
        const regex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
        return  regex.test(val) || 'パスワード名は８〜100文字の半角英数（大文字小文字含む）である必要があります';
    }

    /**
     * メールアドレスのルール
     *
     * @static
     *
     * @memberOf Rules
     */
    public static MailAddressRule: (t: string) => boolean | string  = (val: string) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return  regex.test(val) || 'メールアドレスの書式ではないです';
    }

    /**
     * ISBN13のルール
     *
     * @static
     *
     * @memberOf Rules
     */
    public static Isbn13Rule: (t: string) => boolean | string  = (val: string) => {
        const regex = /^[\d]{13}$/;
        return  regex.test(val) || 'ISBNはハイフン無し数字13桁で入力する必要があります。';
    }

    /**
     * 単純な数値のルール
     *
     * @static
     *
     * @memberOf Rules
     */
    public static SimpleNumberRule: (t: string) => boolean | string  = (val: string) => {
        const regex = /^[\d]+$/;
        return  regex.test(val) || '数字ではありません。';
    }

}
