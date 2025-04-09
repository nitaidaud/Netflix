import IBaseUser from "./IBaseUser";

export default interface IUser extends IBaseUser { 
    id: string,
    name: string;
    emailVerified: boolean | null;
}