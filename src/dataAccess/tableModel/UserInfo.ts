import { IUserInfo } from '@/dataAccess/tableModel/IUserInfo';


export class UserInfo implements IUserInfo {
    public UserId: string;
    public IsLoggedIn: boolean;

    public constructor(userId: string, isLoggedIn: boolean) {
        this.UserId = userId;
        this.IsLoggedIn = isLoggedIn;
    }
}
