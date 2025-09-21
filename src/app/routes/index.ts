import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";
import { BranchRoutes } from "../modules/branch/branch.route";
import { SalesRoutes } from "../modules/sales/sales.route";

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
    },
    {
      path: '/branches',
      route: BranchRoutes
    },
    {
      path: '/sales',
      route: SalesRoutes 
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
