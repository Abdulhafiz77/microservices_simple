import * as grpc from '@grpc/grpc-js';
import { ErrorEnum, PaginationParams, ProductModel } from '../models';
import { ProductRepository } from '../repository';
import { errorHandler } from '../utils';

export const ProductController = {
    getAll: async (params: grpc.ServerUnaryCall<PaginationParams, any>, callback: grpc.sendUnaryData<{ items: ProductModel[] }>) => {
        try {
            const data = await ProductRepository.getAll(params.request);

            return callback(null, { items: data });

        } catch (error) {
            return errorHandler(error, callback)
        }
    },

    getById: async (params: grpc.ServerUnaryCall<{ id: number }, any>, callback: grpc.sendUnaryData<ProductModel>) => {
        try {
            const data = await ProductRepository.getById(params.request.id);
            if (!data)
                return callback({ code: grpc.status.NOT_FOUND, message: ErrorEnum.UserNotFound }, null)

            return callback(null, data);

        } catch (error) {
            return errorHandler(error, callback)
        }
    },

    create: async (params: grpc.ServerUnaryCall<ProductModel, any>, callback: grpc.sendUnaryData<ProductModel>) => {
        try {

            const user = await ProductRepository.create(params.request);
            const data = await ProductRepository.create(params.request);
            if (!data)
                return callback({ code: grpc.status.NOT_FOUND, message: ErrorEnum.UserNotFound }, null)

            return callback(null, data);

        } catch (error) {
            return errorHandler(error, callback)
        }
    },

    update: async (params: grpc.ServerUnaryCall<ProductModel, any>, callback: grpc.sendUnaryData<ProductModel>) => {
        try {

            const user = await ProductRepository.update(params.request);

            const data = await ProductRepository.update(params.request);
            if (!data)
                return callback({ code: grpc.status.NOT_FOUND, message: ErrorEnum.UserNotFound }, null)

            return callback(null, data);

        } catch (error) {
            return errorHandler(error, callback)
        }
    },

    delete: async (params: grpc.ServerUnaryCall<{ id: number }, any>, callback: grpc.sendUnaryData<{ success: boolean }>) => {
        try {
            await ProductRepository.delete(params.request.id);
            return callback(null, { success: true });

        } catch (error) {
            return errorHandler(error, callback)
        }
    }
}