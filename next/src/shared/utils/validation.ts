/**
 * Утилиты для валидации данных
 */

/**
 * Проверяет, является ли строка валидным email
 * @param email - строка для проверки
 * @returns true, если email валиден
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Проверяет силу пароля
 * @param password - пароль для проверки
 * @returns объект с результатом проверки
 */
export const validatePassword = (
    password: string,
): {
    isValid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push("Пароль должен содержать минимум 8 символов");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Пароль должен содержать хотя бы одну заглавную букву");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Пароль должен содержать хотя бы одну строчную букву");
    }

    if (!/\d/.test(password)) {
        errors.push("Пароль должен содержать хотя бы одну цифру");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

/**
 * Проверяет, является ли файл изображением
 * @param file - файл для проверки
 * @returns true, если файл является изображением
 */
export const isImageFile = (file: File): boolean => {
    return file.type.startsWith("image/");
};

/**
 * Проверяет, является ли файл PDF
 * @param file - файл для проверки
 * @returns true, если файл является PDF
 */
export const isPdfFile = (file: File): boolean => {
    return file.type === "application/pdf";
};

/**
 * Проверяет размер файла
 * @param file - файл для проверки
 * @param maxSizeInMB - максимальный размер в мегабайтах
 * @returns true, если размер файла допустим
 */
export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
};

/**
 * Проверяет, является ли строка пустой или содержит только пробелы
 * @param str - строка для проверки
 * @returns true, если строка пустая
 */
export const isEmpty = (str: string): boolean => {
    return !str || str.trim().length === 0;
};

/**
 * Проверяет минимальную длину строки
 * @param str - строка для проверки
 * @param minLength - минимальная длина
 * @returns true, если длина строки достаточна
 */
export const hasMinLength = (str: string, minLength: number): boolean => {
    return str.trim().length >= minLength;
};

/**
 * Проверяет максимальную длину строки
 * @param str - строка для проверки
 * @param maxLength - максимальная длина
 * @returns true, если длина строки не превышает максимум
 */
export const hasMaxLength = (str: string, maxLength: number): boolean => {
    return str.length <= maxLength;
};

/**
 * Валидация данных поста
 * @param title - заголовок поста
 * @param text - текст поста
 * @returns объект с результатом валидации
 */
export const validatePost = (
    title: string,
    text: string,
): {
    isValid: boolean;
    errors: { [key: string]: string };
} => {
    const errors: { [key: string]: string } = {};

    if (isEmpty(title)) {
        errors.title = "Заголовок обязателен";
    } else if (!hasMinLength(title, 3)) {
        errors.title = "Заголовок должен содержать минимум 3 символа";
    } else if (!hasMaxLength(title, 200)) {
        errors.title = "Заголовок не должен превышать 200 символов";
    }

    if (isEmpty(text)) {
        errors.text = "Текст поста обязателен";
    } else if (!hasMinLength(text, 10)) {
        errors.text = "Текст поста должен содержать минимум 10 символов";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
