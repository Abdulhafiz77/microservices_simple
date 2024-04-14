import { ActionResult, PaginationParams, ProductModel } from "../models";
import { ProductService } from "../protos";

export class ProductProvider {

    static async getAll(params?: PaginationParams): Promise<ActionResult<ProductModel>> {
        return new Promise<ActionResult<ProductModel>>((resolve, reject) => {
            ProductService.getAll(params, async (err, data: ActionResult<ProductModel>) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }

    static async getById(id: number): Promise<ProductModel> {
        return new Promise<ProductModel>((resolve, reject) => {
            ProductService.getById({ id: id }, async (err, data: ProductModel) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }

    static async create(params: ProductModel): Promise<ProductModel> {
        return new Promise<ProductModel>((resolve, reject) => {
            ProductService.create(params, async (err, data: ProductModel) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }

    static async update(params: ProductModel): Promise<ProductModel> {
        return new Promise<ProductModel>((resolve, reject) => {
            ProductService.update(params, async (err, data: ProductModel) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }

    static async delete(id: number): Promise<{ success: boolean }> {
        return new Promise<{ success: boolean }>((resolve, reject) => {
            ProductService.delete({ id: id }, async (err, data: { success: boolean }) => {
                if (!err) resolve(data)
                reject(err);
            });
        })
    }
}
