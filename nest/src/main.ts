import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.use(cookieParser());

    if (process.env.NODE_ENV == "dev")
        app.enableCors({
            origin: ["http://localhost:3000", "http://localhost:3002"],
            credentials: true, // Важно для работы с cookies
        });
    await app.listen(3001);
}
bootstrap();
