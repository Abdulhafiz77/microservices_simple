import { USER_PROTO_ENUM } from './models/enums/proto.enum';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {
    UserController
} from '.';

export const proto = async (app: grpc.Server) => {

    const options = {
        keepCase: true,
        longs: String,
        enums: String,
        arrays: true
    }

    const UserProto = await <any>grpc.loadPackageDefinition(protoLoader
        .loadSync(process.env.USER_PATH + USER_PROTO_ENUM.USER_PROTO, options));
    await app.addService(UserProto.UserService.service, UserController);
}
