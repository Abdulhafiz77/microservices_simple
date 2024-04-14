import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { FULL_PROTO_ENUM } from '..';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
    defaults: true,
    oneofs: true
}

const ProductProto = <any>grpc.loadPackageDefinition(protoLoader
    .loadSync(`${process.env.PROTO_PATH + FULL_PROTO_ENUM.PRODUCT_PROTO}`, options)).ProductService;
const ProductService = new ProductProto(String(process.env.PRODUCT_HOST), grpc.credentials.createInsecure());

export{
    ProductService
}