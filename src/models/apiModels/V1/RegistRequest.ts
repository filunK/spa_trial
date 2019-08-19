import {LoginRequest} from '@/models/apiModels/V1/LoginRequest';

export class RegistRequest extends LoginRequest {

    public MailAddress: string;

    public constructor() {
        super();
        this.MailAddress = '';
    }
}
