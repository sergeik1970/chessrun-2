import React, { useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getCurrentUser } from "../../store/slices/auth";

interface AuthProviderProps {
    children: ReactNode;
}
// Компонент провайдера авторизации для обеспечения доступа к данным пользователя в дочерних компонентах
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
