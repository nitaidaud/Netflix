import IBaseResponse from "../IBaseRespone";
import IFavoriteList from "./IFavoriteList";


export default interface IMyListResponse extends IBaseResponse{
    myList: IFavoriteList
}