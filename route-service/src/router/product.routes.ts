import * as express from "express";
import { createValidator } from "express-joi-validation";
import { base_filter_joi, product_id_joi, product_joi } from "../validation";
import { ProductController } from "..";

const validator = createValidator({ passError: true });

export const ProductRoutes = (app: express.Application) => {
    app.get('/', validator.query(base_filter_joi), ProductController.getAll);
    app.post('/', validator.body(product_joi), ProductController.create);
    app.get('/:id', validator.params(product_id_joi), ProductController.getById);
    app.put('/:id', validator.params(product_id_joi), validator.body(product_joi), ProductController.update);
    app.delete('/:id', validator.params(product_id_joi), ProductController.delete);
};