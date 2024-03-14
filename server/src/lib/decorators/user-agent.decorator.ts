import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserAgent = createParamDecorator((_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers["user-agent"];
});
