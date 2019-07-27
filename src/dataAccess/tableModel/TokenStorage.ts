import { ITokenStorage } from '@/dataAccess/tableModel/ITokenStorage';

export class TokenStorage implements ITokenStorage {

    public Id: string;
    public Value: string;

    public constructor(id: string, value: string) {
        this.Id = id;
        this.Value = value;
    }

}
