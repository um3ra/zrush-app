import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { TimerModule } from "./timer/timer.module";
import { TimeBlockModule } from "./time-block/time-block.module";

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env.local", ".env"]
        }),
        UserModule,
        TaskModule,
        TimerModule,
        TimeBlockModule
    ],
    providers: [JwtStrategy]
})
export class AppModule {}
