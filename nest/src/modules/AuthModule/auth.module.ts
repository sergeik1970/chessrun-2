import { Module } from "@nestjs/common"; // Декоратор модуля NestJS
import { TypeOrmModule } from "@nestjs/typeorm"; // Модуль для работы с TypeORM
import { User } from "src/entities/User/user.entity"; // Импорт сущности User
import { AuthService } from "src/services/AuthService/auth.service"; // Импорт сервиса авторизации
import { AuthController } from "src/controllers/AuthController/auth.controller"; // Импорт контроллера авторизации

@Module({
    imports: [TypeOrmModule.forFeature([User])], // Импорт модуля для работы с сущностью User
    controllers: [AuthController], // Указываем контроллеры, которые будут использоваться в этом модуле
    providers: [AuthService], // Сервисы, которые будут использоваться в этом модуле
    exports: [AuthService], // Экспорт сервиса для использования в других модулях
})
export class AuthModule {}
