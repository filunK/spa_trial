
// バリデーションのルールをまとめたクラス
export class Rules {

    // ユーザ名のルール
    public static UsernameRule: (t: string) => boolean | string = (val: string) => {
        const regex = new RegExp('^[a-z\\d]{8,100}$');
        return  regex.test(val) || 'ユーザ名は８〜100文字以上の半角英数字である必要があります';
    }

    // パスワードのルール
    public static PasswordRule: (t: string) => boolean | string  = (val: string) => {
        const regex = new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)[a-zA-Z\\d]{8,100}$');
        return  regex.test(val) || 'ユーザ名は８〜100文字以上の半角英数（大文字小文字含む）である必要があります';
    }

}
