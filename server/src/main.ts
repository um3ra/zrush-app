import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_DOMAIN,
        credentials: true,
        exposedHeaders: "set-cookie"
    });
    await app.listen(4444);
}
bootstrap();
