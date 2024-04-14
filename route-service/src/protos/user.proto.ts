import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { FULL_PROTO_ENUM } from '../models';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
    defaults: true,
    oneofs: true
}

const UserProto = <any>grpc.loadPackageDefinition(protoLoader
    .loadSync(`${process.env.PROTO_PATH + FULL_PROTO_ENUM.USER_PROTO}`, options)).UserService;
const UserService = new UserProto(String(process.env.USER_HOST), grpc.credentials.createInsecure());

export{
    UserService
}