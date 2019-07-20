export class LoginResponse {
    public AccessToken: string;
    public Refresh: string;

    constructor() {
        this.AccessToken = "";
        this.Refresh = "";
    }
}
