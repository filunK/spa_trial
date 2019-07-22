export class LoginResponse {
    public token: string;
    public refresh: string;

    constructor() {
        this.token = "";
        this.refresh = "";
    }
}
