import { ITransferable } from '@/models/ITransferable';
import { RegistRequest } from '@/models/apiModels/V1/RegistRequest';

export class UserModel implements ITransferable<RegistRequest> {
    public UserName: string;
    public Password: string;
    public MailAddress: string;

    public constructor() {
        this.UserName = '';
        this.Password = '';
        this.MailAddress = '';
    }

    public TransferData(copie: RegistRequest): void {
        this.UserName = copie.UserName;
        this.Password = copie.Password;
        this.MailAddress = copie.MailAddress;
    }


}
