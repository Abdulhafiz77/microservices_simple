import { BaseModel } from "./base.modul";

export interface ProductModel extends BaseModel {
    name: string;
    price: string;
    user_id: number;
}
