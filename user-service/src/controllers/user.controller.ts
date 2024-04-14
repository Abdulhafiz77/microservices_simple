import * as grpc from '@grpc/grpc-js';
import { ErrorEnum, PaginationParams, UserModel } from '../models';
import { UserRepository } from '../repository';
import { errorHandler } from '../utils';

export const UserController = {
    getAll: async (params: grpc.ServerUnaryCall<PaginationParams, any>, callback: grpc.sendUnaryData<{ items: UserModel[] }>) => {
        try {
            const data = await UserRepository.getAll(params.request);

            return callback(null, { items: data });

        } catch (error) {
            return errorHandler(error, callback)
        }
    },

    getById: async (params: grpc.ServerUnaryCall<{ id: number }, any>, callback: grpc.sendUnaryData<UserModel>) => {
        try {
            const data = await UserRepository.getById(params.request.id);
            if (!data)
                return callback({ code: grpc.status.NOT_FOUND, message: ErrorEnum.UserNotFound }, null)

            return callback(null, data);

        } catch (error) {
            return errorHandler(error, callback)
        }
    },

    create: async (params: grpc.ServerUnaryCall<UserModel, any>, callback: grpc.sendUnaryData<UserModel>) => {
        try {

            const user = await UserRepository.create(params.request);
            const data = await UserRepository.create(params.request);
            if (!data)
                return callback({ code: grpc.status.NOT_FOUND, message: ErrorEnum.UserNotFound }, null)

            return callback(null, data);

        } catch (error) {
            return errorHandler(error, callback)
        }
    },

    update: async (params: grpc.ServerUnaryCall<UserModel, any>, callback: grpc.sendUnaryData<UserModel>) => {
        try {

            const user = await UserRepository.update(params.request);

            const data = await UserRepository.update(params.request);
            if (!data)
                return callback({ code: grpc.status.NOT_FOUND, message: ErrorEnum.UserNotFound }, null)

            return callback(null, data);

        } catch (error) {
            return errorHandler(error, callback)
        }
    },

    delete: async (params: grpc.ServerUnaryCall<{ id: number }, any>, callback: grpc.sendUnaryData<{ success: boolean }>) => {
        try {
            await UserRepository.delete(params.request.id);
            return callback(null, { success: true });

        } catch (error) {
            return errorHandler(error, callback)
        }
    }
}
