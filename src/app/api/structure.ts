import { Url } from "url";

export interface HTTPNormalResponse {
    result: Number;
    message: String;
}
export interface HttpTableApi<ItemStructure> {
    items: ItemStructure[];
    total_count: Number;
}

export interface UserModelContact {
    email: String;
    phone: String;
    picture: Url;
    providerId: String;
}

export interface UserModel {
    _id: String;
    no: Number;
    contact: UserModelContact;
    firstName: String;
    lastName: String;
    createdAt: Date;
    lastLogin: Date;
    loginCount: Number;
    status: Boolean;
}
