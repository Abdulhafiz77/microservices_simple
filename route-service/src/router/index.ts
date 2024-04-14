import { ProductRoutes } from './product.routes';
import * as express from "express";
import { errorHandler } from "..";
import { UserRoutes } from "./user.routes";

function nestedRoutes(this: any, path, configure) {
    const router = express.Router({ mergeParams: true });
    this.use(path, router);
    configure(router);
    return router;
}

express.application['prefix'] = nestedRoutes;
express.Router['prefix'] = nestedRoutes;

const expressRouter = express.Router({ mergeParams: true });

export const routes = (app: express.Application) => {

    expressRouter['prefix']('/api', app => {

        app['prefix']('/user', routes => {
            UserRoutes(routes)
        });

        app['prefix']('/product', routes => {
            ProductRoutes(routes)
        });
    })

    app.use(expressRouter);
    app.use(errorHandler);
};
