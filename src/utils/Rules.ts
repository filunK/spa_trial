
// バリデーションのルールをまとめたクラス
export class Rules {

    // ユーザ名のルール
    public static UsernameRule: (t: string) => boolean | string = (val: string) => {
        const regex = /^[a-zA-Z\d]{8,100}$/;
        return  regex.test(val) || 'ユーザ名は８〜100文字の半角英数字である必要があります';
    }

    // パスワードのルール
    public static PasswordRule: (t: string) => boolean | string  = (val: string) => {
        const regex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
        return  regex.test(val) || 'パスワード名は８〜100文字の半角英数（大文字小文字含む）である必要があります';
    }

    // メールアドレスのルール
    public static MailAddressRule: (t: string) => boolean | string  = (val: string) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return  regex.test(val) || 'メールアドレスの書式ではないです';
    }

}
