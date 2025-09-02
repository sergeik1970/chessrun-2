/**
 * Константы приложения
 */

// Константы для постов
export const POST_CONSTANTS = {
    MAX_TITLE_LENGTH: 200,
    MIN_TITLE_LENGTH: 3,
    MIN_TEXT_LENGTH: 10,
    MAX_TEXT_PREVIEW_LENGTH: 300,
    MAX_IMAGES_COUNT: 10,
    MAX_FILES_COUNT: 5,
} as const;

// Константы для файлов
export const FILE_CONSTANTS = {
    MAX_IMAGE_SIZE_MB: 5,
    MAX_FILE_SIZE_MB: 10,
    ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    ALLOWED_FILE_TYPES: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
} as const;

// Константы для валидации
export const VALIDATION_CONSTANTS = {
    MIN_PASSWORD_LENGTH: 8,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Константы для UI
export const UI_CONSTANTS = {
    DEBOUNCE_DELAY: 300,
    ANIMATION_DURATION: 200,
    MODAL_Z_INDEX: 1000,
    TOAST_DURATION: 3000,
} as const;

// Категории постов
export const POST_CATEGORIES = {
    TRAVEL: "travel",
    COMPETITION: "competition",
    TRAINING: "training",
    NEWS: "news",
    EVENTS: "events",
} as const;

// Роли пользователей
export const USER_ROLES = {
    USER: "user",
    ADMIN: "admin",
} as const;

// Статусы загрузки
export const LOADING_STATES = {
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
} as const;

// Брейкпоинты для адаптивности
export const BREAKPOINTS = {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE_DESKTOP: 1200,
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Ошибка сети. Проверьте подключение к интернету.",
    UNAUTHORIZED: "Необходимо войти в систему.",
    FORBIDDEN: "Недостаточно прав для выполнения операции.",
    NOT_FOUND: "Запрашиваемый ресурс не найден.",
    SERVER_ERROR: "Внутренняя ошибка сервера. Попробуйте позже.",
    VALIDATION_ERROR: "Проверьте правильность заполнения полей.",
    FILE_TOO_LARGE: "Размер файла превышает допустимый лимит.",
    INVALID_FILE_TYPE: "Неподдерживаемый тип файла.",
} as const;

// Сообщения об успехе
export const SUCCESS_MESSAGES = {
    POST_CREATED: "Пост успешно создан.",
    POST_UPDATED: "Пост успешно обновлен.",
    POST_DELETED: "Пост успешно удален.",
    LOGIN_SUCCESS: "Вы успешно вошли в систему.",
    LOGOUT_SUCCESS: "Вы успешно вышли из системы.",
    REGISTRATION_SUCCESS: "Регистрация прошла успешно.",
    FILE_UPLOADED: "Файл успешно загружен.",
} as const;
