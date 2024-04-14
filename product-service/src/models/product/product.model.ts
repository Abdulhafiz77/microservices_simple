import { BaseModel } from "../base/base.model";


export interface ProductModel extends BaseModel {
  name: string;
  price: string;
  user_id: number;
}
