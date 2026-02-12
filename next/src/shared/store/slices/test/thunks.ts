import { API_ENDPOINTS, createApiUrl } from "@/shared/config/api";
import { RegisterUserData } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks для API вызовов
export const registerUser = createAsyncThunk(
    "auth/register",
    // Передаем данные пользователя
    async (userData: RegisterUserData, { rejectWithValue }) => {
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
