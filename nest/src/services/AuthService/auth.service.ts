import {
    Injectable, // Делает класс доступным для внедрения зависимостей
    UnauthorizedException, // Ошибка, возникающая при неверном логине или пароле (401)
    ConflictException, // Ошибка, возникающая при попытке создания дубликата пользователя (409)
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"; // Чтобы использовать репозиторий для работы с базой данных
import { Repository } from "typeorm"; // Репозиторий для работы с базой данных
import { JwtService } from "@nestjs/jwt"; // Для работы с JWT токенами
import { User } from "src/entities/User/user.entity"; // Сущность пользователя
import * as bcrypt from "bcrypt"; // Для хеширования пароля

// Что нужно для регистрации
export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}

// DTO — это Data Transfer Object (объект передачи данных)

// Что нужно для входа
export interface LoginDto {
    email: string;
    password: string;
}

@Injectable() // Делает класс доступным для внедрения зависимостей
export class AuthService {
    constructor(
        @InjectRepository(User) // Внедряем репозиторий для работы с базой данных
        private readonly userRepository: Repository<User>, // Репозиторий для работы с базой данных
        private readonly jwtService: JwtService, // Сервис для работы с JWT токенами
    ) {}

    // Обычная регистрация пользователя (потом админ статус ставится вручную)
    async register(registerDto: RegisterDto): Promise<User> {
        const { email, password, name } = registerDto;

        // Проверяем, существует ли пользователь с таким email
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            // Если пользователь существует, выбрасываем ошибку 409
            throw new ConflictException(
                "Пользователь с таким email уже существует",
            );
        }

        // Хешируем пароль с помощью bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Создаем нового пользователя (по умолчанию не админ)
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            name,
            isAdmin: false, // По умолчанию не админ
        });

        return this.userRepository.save(user); // Сохраняем пользователя в базе данных
    }

    async loginAdmin(loginDto: LoginDto): Promise<User> {
        const { email, password } = loginDto; // Получаем email и пароль из DTO

        // Находим пользователя по email
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            // Если пользователь не найден, выбрасываем ошибку 401
            throw new UnauthorizedException("Неверный email или пароль");
        }

        // Проверяем, что пользователь - админ
        if (!user.isAdmin) {
            throw new UnauthorizedException(
                "Доступ запрещен. Только для администраторов",
            );
        }

        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Если пароль неверный, выбрасываем ошибку 401
            throw new UnauthorizedException("Неверный email или пароль");
        }

        return user;
    }

    // Получаем пользователя по id
    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    // Генерируем JWT токен для пользователя
    generateToken(user: User): string {
        const payload = {
            sub: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        return this.jwtService.sign(payload);
    }
}
