import { BaseModel } from "../base/base.model";


export interface UserModel extends BaseModel {
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  email?: string;
  password?: string;
}
