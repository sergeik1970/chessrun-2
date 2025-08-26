import { Module } from "@nestjs/common"; // Декоратор модуля NestJS
import { TypeOrmModule } from "@nestjs/typeorm"; // Модуль для работы с TypeORM
import { JwtModule, JwtService } from "@nestjs/jwt";
import { User } from "src/entities/User/user.entity"; // Импорт сущности User
import { AuthService } from "src/services/AuthService/auth.service"; // Импорт сервиса авторизации
import { AuthController } from "src/controllers/AuthController/auth.controller"; // Импорт контроллера авторизации
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AdminGuard } from "./admin.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Импорт модуля для работы с сущностью User
        JwtModule.register({
            secret: process.env.JWT_SECRET || "your-secret-key",
            signOptions: { expiresIn: "7d" },
        }),
    ],
    controllers: [AuthController], // Указываем контроллеры, которые будут использоваться в этом модуле
    providers: [AuthService, JwtAuthGuard, AdminGuard], // Сервисы, которые будут использоваться в этом модуле
    exports: [AuthService, JwtAuthGuard, AdminGuard, JwtModule], // Экспорт сервиса для использования в других модулях
})
export class AuthModule {}
