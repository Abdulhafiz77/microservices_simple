import { INTERNAL_SERVER_ERROR } from "http-status-codes";
import { PaginationParams, ProductModel, ValidatedRequestBody, ValidatedRequestQuery } from "../models";
import { ValidatedRequest } from "express-joi-validation";
import { ErrorService, buildPagination } from "../utils";
import { ProductProvider } from "../provider";

export class ProductController {
    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res: any) {
        try {
            const result = await ProductProvider.getAll({ ...req.query});
            if (!result.items) return ErrorService.error(res, result, INTERNAL_SERVER_ERROR);

            if (req.query.limit && !isNaN(req.query.page))
                return res.send(await buildPagination<ProductModel>
                    (result.items!, req.query.page, req.query.limit))
            res.send(result);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getById(req: ValidatedRequest<ValidatedRequestQuery<any>>, res: any) {
        try {

            const result = await ProductProvider.getById(req.params.id);
            res.send(result);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async create(req: ValidatedRequest<ValidatedRequestBody<ProductModel>>, res: any) {
        try {
            await ProductProvider.create(req.body);
            return res.send({ success: true });
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async update(req: ValidatedRequest<ValidatedRequestBody<ProductModel>>, res: any) {
        try {
            await ProductProvider.update(req.body);
            return res.send({ success: true });
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res: any) {
        try {
            await ProductProvider.delete(req.params.id);
            return res.send({ success: true });
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}
