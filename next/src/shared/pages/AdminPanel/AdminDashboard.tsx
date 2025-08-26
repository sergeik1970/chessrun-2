import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "../../store/store";
import { logoutUser } from "../../store/slices/auth";
import { User } from "../../store/slices/auth";
import PostsManager from "./PostsManager";
import styles from "./AdminDashboard.module.scss";

interface AdminDashboardProps {
    user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"posts" | "users">("posts");

    const handleLogout = async () => {
        await dispatch(logoutUser());
        router.push("/");
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Панель администратора</h1>
                    <div className={styles.userInfo}>
                        <span className={styles.welcome}>Добро пожаловать, {user.name}!</span>
                        <span className={styles.email}>({user.email})</span>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Выйти
                        </button>
                    </div>
                </div>
            </header>

            <nav className={styles.navigation}>
                <button
                    className={`${styles.navButton} ${activeTab === "posts" ? styles.active : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    Управление постами
                </button>
                <button
                    className={`${styles.navButton} ${activeTab === "users" ? styles.active : ""}`}
                    onClick={() => setActiveTab("users")}
                >
                    Пользователи
                </button>
            </nav>

            <main className={styles.content}>
                {activeTab === "posts" && <PostsManager />}
                {activeTab === "users" && (
                    <div className={styles.placeholder}>
                        <h2>Управление пользователями</h2>
                        <p>Функционал в разработке...</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
