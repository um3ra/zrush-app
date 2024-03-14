import {
    middlewareChain,
    i18nMiddleware,
    authMiddleware
} from "./app/middlewares";

export default middlewareChain([authMiddleware, i18nMiddleware]);
