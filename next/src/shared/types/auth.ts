/**
 * Типы для системы авторизации и пользователей
 */

// Интерфейс пользователя
export interface User {
    id: number;
    email: string;
    name: string;
    isAdmin?: boolean;
    createdAt: string;
    updatedAt: string;
}

// Интерфейс состояния авторизации
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Данные для формы авторизации
export interface AuthFormData {
    email: string;
    password: string;
    name?: string;
}

// Данные для регистрации пользователя
export interface RegisterUserData {
    email: string;
    password: string;
    name: string;
}

// Данные для входа пользователя
export interface LoginUserData {
    email: string;
    password: string;
}

// Ответ от сервера при авторизации
export interface AuthResponse {
    user: User;
    token?: string;
    message?: string;
}
