import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterModule } from "@nestjs/platform-express";
import { News } from "../../entities/News/news.entity";
import { Files } from "../../entities/Files/files.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { AuthModule } from "../AuthModule/auth.module";
import { multerConfig } from "../../config/multer.config";

@Module({
    imports: [
        TypeOrmModule.forFeature([News, Files]),
        MulterModule.register(multerConfig),
        AuthModule,
    ],
    controllers: [NewsController],
    providers: [NewsService],
    exports: [NewsService],
})
export class NewsModule {}
