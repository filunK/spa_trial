export class RegistResponse {

    public confirmUri: string;
    public limits: Date;

    public constructor() {
        this.confirmUri = '';
        this.limits = new Date();
    }
}
