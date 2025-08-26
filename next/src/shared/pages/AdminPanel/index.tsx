import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "../../store/store";
import { getCurrentUser } from "../../store/slices/auth";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";
import styles from "./index.module.scss";

const AdminPanel = (): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        // Проверяем аутентификацию при загрузке
        dispatch(getCurrentUser());
    }, [dispatch]);

    // Показываем загрузку
    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Загрузка...</p>
            </div>
        );
    }

    // Если пользователь не авторизован или не админ, показываем форму входа
    if (!isAuthenticated || !user?.isAdmin) {
        return (
            <div className={styles.container}>
                <div className={styles.authWrapper}>
                    <h1 className={styles.title}>Панель администратора</h1>
                    <AdminAuth />
                </div>
            </div>
        );
    }

    // Если авторизован и админ, показываем панель управления
    return (
        <div className={styles.container}>
            <AdminDashboard user={user} />
        </div>
    );
};

export default AdminPanel;
