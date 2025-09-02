/**
 * Типы для утилитарных функций
 */

// Интерфейс для debounced функции
export interface DebouncedFunc<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void;
    cancel: () => void;
    flush: () => void;
}

// Типы для работы с изображениями
export interface ImageProcessingOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: "jpeg" | "png" | "webp";
}

// Результат обработки изображения
export interface ProcessedImage {
    file: string; // base64 данные
    width: number;
    height: number;
    size: number;
    mimeType: string;
}

// Типы для работы с текстом
export interface TextTruncateOptions {
    maxLength: number;
    suffix?: string;
    preserveWords?: boolean;
}

// Опции для форматирования даты
export interface DateFormatOptions {
    locale?: string;
    format?: "short" | "medium" | "long" | "full";
    includeTime?: boolean;
}

// Результат валидации пароля
export interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
}

// Результат валидации поста
export interface PostValidationResult {
    isValid: boolean;
    errors: { [key: string]: string };
}

// Опции для валидации файлов
export interface FileValidationOptions {
    maxSizeInMB?: number;
    allowedTypes?: string[];
    allowImages?: boolean;
    allowPdf?: boolean;
}
