import IBaseResponse from "../IBaseRespone";
import IProfile from "./IProfile";

export default interface IProfileResponse extends IBaseResponse { 
    profile: IProfile
} 