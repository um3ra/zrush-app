import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "../auth.interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly config: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET")
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.findByEmail(payload.id);

        if (!user) throw new UnauthorizedException();

        return payload;
    }
}
