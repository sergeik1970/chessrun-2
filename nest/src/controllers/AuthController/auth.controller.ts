import {
    Controller, // Для создания контроллера
    Post, // Для обработки POST запросов
    Body, // Для получения тела запроса
    Res, // Для отправки ответа
    HttpStatus, /// Для установки статуса ответа
    Get, // Для обработки GET запросов
    Req, // Для получения запроса
} from "@nestjs/common";
import { Response, Request } from "express"; // Типы Express для подсказок типов
import {
    AuthService, // Сервис аутентификации
    RegisterDto, // Данные для регистрации
    LoginDto, /// Данные для входа
} from "src/services/AuthService/auth.service";

@Controller("auth") // Префикс для всех маршрутов
export class AuthController {
    constructor(private readonly authService: AuthService) {} // Инициализация сервиса

    @Post("register") // Обработчик POST запроса для регистрации
    // Получение данных из тела запроса
    async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
        try {
            const user = await this.authService.register(registerDto); // Регистрируем пользователя

            // Устанавливаем cookie с ID пользователя
            res.cookie("userId", user.id.toString(), {
                httpOnly: true, // Запрещает доступ к cookie через JavaScript, только HTTP
                secure: process.env.NODE_ENV === "production", // Только HTTPS
                sameSite: "lax", // Устанавливает строгий режим безопасности
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней будет ъраниться куки в браузере
            });

            // Возвращаем пользователя без пароля
            const { password, ...userWithoutPassword } = user;

            return res.status(HttpStatus.CREATED).json({
                // Отправляем ответ с пользователем и сообщением если нет ошибок
                message: "Пользователь успешно зарегистрирован",
                user: userWithoutPassword,
            });
            // Если ошибка, то отправляем её
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    @Post("login") // Обработчик POST запроса для входа
    // Получение данных из тела запроса
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        try {
            // Входим в систему
            const user = await this.authService.login(loginDto);

            // Устанавливаем cookie с ID пользователя
            res.cookie("userId", user.id.toString(), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
            });

            // Возвращаем пользователя без пароля
            const { password, ...userWithoutPassword } = user;

            return res.status(HttpStatus.OK).json({
                // Отправляем ответ с пользователем и сообщением если всё хорошо
                message: "Успешный вход в систему",
                user: userWithoutPassword,
            });
        } catch (error) {
            // Если ошибка
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: error.message,
            });
        }
    }

    @Post("logout") // Обработчик POST запроса для выхода из системы
    // Получение ответа
    async logout(@Res() res: Response) {
        res.clearCookie("userId"); // Удаление куки
        // Если удален успешно
        return res.status(HttpStatus.OK).json({
            message: "Успешный выход из системы",
        });
    }

    @Get("me") // Обработчик GET запроса для получения текущего пользователя (проверка авторизации при входе на страницу)
    // Получение запроса и ответа
    async getCurrentUser(@Req() req: Request, @Res() res: Response) {
        try {
            const userId = req.cookies?.userId; // Получение ID пользователя из куки

            if (!userId) {
                // Если ID не найден, то пользователь не авторизован
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: "Пользователь не авторизован",
                });
            }

            const user = await this.authService.findById(parseInt(userId)); // Ищем пользователя по ID

            if (!user) {
                // Если пользователь не найден
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: "Пользователь не найден",
                });
            }

            // Возвращаем пользователя без пароля
            const { password, ...userWithoutPassword } = user;

            // Если всё хорошо
            return res.status(HttpStatus.OK).json({
                user: userWithoutPassword,
            });
        } catch (error) {
            // Если ошибка
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Ошибка сервера",
            });
        }
    }
}
