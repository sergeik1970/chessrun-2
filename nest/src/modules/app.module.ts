import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./AuthModule/auth.module";
import { NewsModule } from "./NewsModule/news.module";
import { SliderModule } from "./SliderModule/slider.module";
import { FilesModule } from "./FilesModule/files.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Делаем ConfigModule глобальным
            envFilePath: ".env", // Путь к .env файлу
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.NODE_ENV == "dev" ? "127.0.0.1" : "db",
            port: 5432,
            username: "postgres",
            password: process.env.DATABASE_PASSWORD || "postgres",
            database: "postgres",
            autoLoadEntities: true,
            synchronize: false, // Временно включаем для создания таблиц
        }),
        AuthModule,
        NewsModule,
        SliderModule,
        FilesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
