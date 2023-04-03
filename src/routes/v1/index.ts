import { Router } from "express";
import feeds from "./feeds.route";

const router = Router();

const defaultRoutes = [
    {
        path: "/feeds",
        route: feeds
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
