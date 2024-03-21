import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>("API_PORT");
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_DOMAIN,
        credentials: true,
        exposedHeaders: "set-cookie"
    });
    await app.listen(port);
}
bootstrap();
