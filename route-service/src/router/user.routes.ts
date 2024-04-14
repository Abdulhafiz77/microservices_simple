import * as express from "express";
import { createValidator } from "express-joi-validation";
import { UserController } from "../controllers";
import { base_filter_joi, user_id_joi } from "../validation/other.validation";
import { user_joi } from "../validation/user.validation";

const validator = createValidator({ passError: true });

export const UserRoutes = (app: express.Application) => {
    app.get('/', validator.query(base_filter_joi), UserController.getAll);
    app.post('/', validator.body(user_joi), UserController.create);
    app.get('/:id', validator.params(user_id_joi), UserController.getById);
    app.put('/:id', validator.params(user_id_joi), validator.body(user_joi), UserController.update);
    app.delete('/:id', validator.params(user_id_joi), UserController.delete);
};
