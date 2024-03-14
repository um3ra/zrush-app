import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "src/auth/auth.interfaces";

export const CurrentUser = createParamDecorator(
    (key: string, ctx: ExecutionContext): JwtPayload | Partial<JwtPayload> => {
        const req = ctx.switchToHttp().getRequest();
        return key ? req.user[key] : req.user;
    }
);
