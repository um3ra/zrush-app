import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    UnauthorizedException
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import { UserAgent } from "src/lib/decorators/user-agent.decorator";
import { Cookie } from "src/lib/decorators";
import { ConfigService } from "@nestjs/config";
import { Tokens } from "./auth.interfaces";

const REFRESH_TOKEN_KEY = "refreshToken";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly config: ConfigService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post(["/sign-in", "login"])
    async login(
        @Body() dto: LoginDto,
        @UserAgent() userAgent: string,
        @Res({ passthrough: true }) res: Response
    ) {
        const tokens = await this.authService.login(dto, userAgent);
        this.setRefreshTokenToCookies(tokens, res);

        return { accessToken: tokens.accessToken };
    }

    @Post(["/sign-up", "register"])
    async register(
        @Body() dto: RegisterDto,
        @UserAgent() userAgent: string,
        @Res({ passthrough: true }) res: Response
    ) {
        const tokens = await this.authService.register(dto, userAgent);
        this.setRefreshTokenToCookies(tokens, res);

        return { accessToken: tokens.accessToken };
    }

    @HttpCode(HttpStatus.OK)
    @Get("refresh-tokens")
    async refreshTokens(
        @Cookie(REFRESH_TOKEN_KEY) rt: string,
        @Res({ passthrough: true }) res: Response,
        @UserAgent() userAgent: string
    ) {
        if (!rt) throw new UnauthorizedException();

        const tokens = await this.authService.refreshTokens(rt, userAgent);

        this.setRefreshTokenToCookies(tokens, res);

        return { accessToken: tokens.accessToken };
    }

    @HttpCode(HttpStatus.OK)
    @Delete("/logout")
    async logout(
        @Cookie(REFRESH_TOKEN_KEY) token: string,
        @Res({ passthrough: true }) res: Response
    ) {
        if (!token) return;
        await this.authService.deleteToken(token);

        res.cookie(REFRESH_TOKEN_KEY, "", {
            httpOnly: true,
            expires: new Date(),
            secure: this.config.get("NODE_ENV", "dev") === "production",
            sameSite: "lax"
        });
    }

    private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException();
        }

        res.cookie(REFRESH_TOKEN_KEY, tokens.refreshToken.token, {
            httpOnly: true,
            expires: new Date(tokens.refreshToken.exp),
            secure: this.config.get("NODE_ENV", "dev") === "production",
            sameSite: "lax"
        });
    }
}
