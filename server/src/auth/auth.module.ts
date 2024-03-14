import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { options } from "./config";

@Module({
    imports: [PrismaModule, UserModule, JwtModule.registerAsync(options())],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
