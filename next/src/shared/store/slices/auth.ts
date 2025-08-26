import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createApiUrl, API_ENDPOINTS } from "../../config/api";

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
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
// Инициализация состояния
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Async thunks для API вызовов
export const registerUser = createAsyncThunk(
    "auth/register",
    // Передаем данные пользователя
    async (userData: { email: string; password: string; name: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(createApiUrl(API_ENDPOINTS.auth.register), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                // Передаем данные в формате JSON
                body: JSON.stringify(userData),
            });

            // Получаем ответ от сервера и преобразуем его в JSON-формат
            const data = await response.json();

            // Проверяем статус ответа
            if (!response.ok) {
                return rejectWithValue(data.message || "Ошибка регистрации");
            }

            return data.user;
        } catch (error) {
            return rejectWithValue("Ошибка соединения с сервером");
        }
    },
);

export const loginUser = createAsyncThunk(
    "auth/login",
    // Передаем данные пользователя
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            // Отправляем POST запрос на логин
            const response = await fetch(createApiUrl(API_ENDPOINTS.auth.login), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                // Передаем данные в формате JSON
                body: JSON.stringify(userData),
            });

            // Получаем ответ от сервера
            const data = await response.json();

            // Проверяем статус ответа
            if (!response.ok) {
                return rejectWithValue(data.message || "Ошибка входа");
            }

            // Сохраняем токен в localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return data.user;
        } catch (error) {
            return rejectWithValue("Ошибка соединения с сервером");
        }
    },
);

// Асинхронный thunk для выхода
export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(createApiUrl(API_ENDPOINTS.auth.logout), {
            method: "POST",
            credentials: "include",
        });

        // Проверяем статус ответа
        if (!response.ok) {
            return rejectWithValue("Ошибка выхода");
        }

        // Удаляем токен из localStorage
        localStorage.removeItem('token');

        return null;
    } catch (error) {
        return rejectWithValue("Ошибка соединения с сервером");
    }
});

// Асинхронный thunk для получения текущего пользователя
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            // Получаем токен из localStorage
            const token = localStorage.getItem('token');
            
            if (!token) {
                return rejectWithValue("Токен не найден");
            }

            // Отправляем GET запрос на получение текущего пользователя
            const response = await fetch(createApiUrl(API_ENDPOINTS.auth.me), {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                credentials: "include",
            });

            const data = await response.json();

            // Проверяем статус ответа
            if (!response.ok) {
                return rejectWithValue(data.message || "Пользователь не авторизован");
            }

            return data.user;
        } catch (error) {
            return rejectWithValue("Ошибка соединения с сервером");
        }
    },
);

// Создаем слайс для авторизации
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Очистка ошибки
        clearError: (state) => {
            state.error = null;
        },
        // Очистка авторизации
        clearAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            // Пользователь зарегистрирован
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Logout
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Get current user
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
