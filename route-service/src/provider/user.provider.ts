import { ActionResult, PaginationParams, UserModel } from "../models";
import { UserService } from "../protos/user.proto";

export class UserProvider {

    static async getAll(params?: PaginationParams): Promise<ActionResult<UserModel>> {
        return new Promise<ActionResult<UserModel>>((resolve, reject) => {
            UserService.getAll(params, async (err, data: ActionResult<UserModel>) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }

    static async getById(id: number): Promise<UserModel> {
        return new Promise<UserModel>((resolve, reject) => {
            UserService.getById({ id: id }, async (err, data: UserModel) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }

    static async create(params: UserModel): Promise<UserModel> {
        return new Promise<UserModel>((resolve, reject) => {
            UserService.create(params, async (err, data: UserModel) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }

    static async update(params: UserModel): Promise<UserModel> {
        return new Promise<UserModel>((resolve, reject) => {
            UserService.update(params, async (err, data: UserModel) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }

    static async delete(id: number): Promise<{ success: boolean }> {
        return new Promise<{ success: boolean }>((resolve, reject) => {
            UserService.delete({ id: id }, async (err, data: { success: boolean }) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }
}
