import { INTERNAL_SERVER_ERROR } from "http-status-codes";
import { UserProvider } from "../provider/user.provider";
import { PaginationParams, UserModel, ValidatedRequestBody, ValidatedRequestQuery } from "../models";
import { ValidatedRequest } from "express-joi-validation";
import { ErrorService, buildPagination } from "../utils";

export class UserController {
    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res: any) {
        try {
            const result = await UserProvider.getAll({ ...req.query});
            if (!result.items) return ErrorService.error(res, result, INTERNAL_SERVER_ERROR);

            if (req.query.limit && !isNaN(req.query.page))
                return res.send(await buildPagination<UserModel>
                    (result.items!, req.query.page, req.query.limit))
            res.send(result);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getById(req: ValidatedRequest<ValidatedRequestQuery<any>>, res: any) {
        try {

            const result = await UserProvider.getById(req.params.id);
            res.send(result);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async create(req: ValidatedRequest<ValidatedRequestBody<UserModel>>, res: any) {
        try {
            await UserProvider.create(req.body);
            return res.send({ success: true });
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async update(req: ValidatedRequest<ValidatedRequestBody<UserModel>>, res: any) {
        try {
            await UserProvider.update(req.body);
            return res.send({ success: true });
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res: any) {
        try {
            await UserProvider.delete(req.params.id);
            return res.send({ success: true });
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}

