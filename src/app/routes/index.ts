import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
      path: '/auth',
      route: AuthRoutes
    },
    {
      path: '/products',
      route: ProductRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
