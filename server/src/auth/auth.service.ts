import {
    ConflictException,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto";
import { UserService } from "src/user/user.service";
import { compareSync } from "bcryptjs";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { v4 } from "uuid";
import { add } from "date-fns";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: RegisterDto, userAgent: string) {
        const oldUser = await this.userService.findByEmail(dto.email);

        if (oldUser) {
            throw new ConflictException("user with this email exists");
        }

        const user = await this.userService.create(dto);

        return this.generateTokens(user, userAgent);
    }

    async login(dto: LoginDto, userAgent: string) {
        const user = await this.userService.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        if (!compareSync(dto.password, user.password)) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return this.generateTokens(user, userAgent);
    }

    async refreshTokens(rt: string, userAgent: string) {
        const token = await this.prismaService.token.delete({
            where: {
                token: rt
            }
        });

        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.findByEmail(token.userId);

        return this.generateTokens(user, userAgent);
    }

    deleteToken(token: string) {
        return this.prismaService.token.delete({
            where: { token }
        });
    }

    private async generateTokens(userData: User, userAgent: string) {
        const accessToken =
            "Bearer " +
            this.jwtService.sign({
                email: userData.email,
                id: userData.id
            });
        const refreshToken = await this.getRefreshToken(userData.id, userAgent);

        return { accessToken, refreshToken };
    }

    private async getRefreshToken(userId: string, userAgent: string) {
        const oldToken = await this.prismaService.token.findFirst({
            where: {
                userId,
                userAgent
            }
        });

        return this.prismaService.token.upsert({
            where: {
                token: oldToken?.token ?? ""
            },
            create: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
                userId,
                userAgent
            },
            update: {
                exp: add(new Date(), { months: 1 }),
                token: v4()
            }
        });
    }
}
