import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getCurrentUser } from "../../store/slices/auth";
import { AuthProviderProps } from "../../types/components";

/**
 * Компонент провайдера авторизации для обеспечения доступа к данным пользователя в дочерних компонентах
 * Автоматически проверяет аутентификацию при загрузке приложения
 */
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Достаем диспетчер и состояние из хранилища
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        // Проверяем аутентификацию при загрузке приложения
        if (!isAuthenticated) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, isAuthenticated]);

    // Загрузочный экран
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontSize: "18px",
                }}
            >
                Загрузка...
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthProvider;
