import React, { ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "../../store/store";
import { registerUser, loginUser, clearError } from "../../store/slices/auth";
import { AuthFormData } from "../../types/auth";

const Auth = (): ReactElement => {
    const dispatch = useDispatch();
    const router = useRouter();
    // Проверка на аутентификацию
    const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<AuthFormData>({
        email: "",
        password: "",
        name: "",
    });
    const [success, setSuccess] = useState("");

    // Перенаправление после успешной аутентификации через 1,5 секунды
    useEffect(() => {
        if (isAuthenticated && user) {
            setSuccess(`Добро пожаловать, ${user.name}!`);
            setTimeout(() => {
                router.push("/"); // Перенаправляем на главную страницу
            }, 1500);
        }
    }, [isAuthenticated, user, router]);

    // Обработка инпутов формы
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        dispatch(clearError());
        setSuccess("");
    };

    // Отмена дефолтного сабмита формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");

        // Проверка данных
        if (isLogin) {
            const result = await dispatch(
                // Диспатч логина
                loginUser({
                    email: formData.email,
                    password: formData.password,
                }),
            );
            // Очистка формы
            if (loginUser.fulfilled.match(result)) {
                setFormData({ email: "", password: "", name: "" });
            }
        } else {
            // Проверка имени пользователя
            if (!formData.name) {
                return;
            }

            const result = await dispatch(
                // Диспатч регистрации
                registerUser({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                }),
            );

            // Очистка формы
            if (registerUser.fulfilled.match(result)) {
                setFormData({ email: "", password: "", name: "" });
            }
        }
    };

    // Переключение между логином и регистрацией
    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ email: "", password: "", name: "" });
        dispatch(clearError());
        setSuccess("");
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <h1 className={styles.title}>{isLogin ? "Вход в систему" : "Регистрация"}</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Имя для регистрации */}
                    {!isLogin && (
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Имя:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                required={!isLogin}
                                disabled={loading}
                                className={styles.input}
                            />
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={loading}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            disabled={loading}
                            className={styles.input}
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}

                    <button type="submit" disabled={loading} className={styles.submitButton}>
                        {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
                    </button>
                </form>

                <div className={styles.toggleMode}>
                    <p>
                        {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className={styles.toggleButton}
                            disabled={loading}
                        >
                            {isLogin ? "Зарегистрироваться" : "Войти"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
