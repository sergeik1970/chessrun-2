import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { registerUser, loginUser, clearError } from "../../store/slices/auth";
import styles from "./AdminAuth.module.scss";

interface AuthFormData {
    email: string;
    password: string;
    name?: string;
}

const AdminAuth = (): ReactElement => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<AuthFormData>({
        email: "",
        password: "",
        name: "",
    });
    const [success, setSuccess] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // НЕ очищаем ошибки при вводе - только при отправке формы
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Очищаем предыдущие сообщения при отправке формы
        setSuccess("");

        if (isLogin) {
            const result = await dispatch(
                loginUser({
                    email: formData.email,
                    password: formData.password,
                }),
            );

            if (loginUser.fulfilled.match(result)) {
                setFormData({ email: "", password: "", name: "" });
                setSuccess("Успешный вход в систему!");
            }
        } else {
            if (!formData.name) {
                return;
            }

            const result = await dispatch(
                registerUser({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                }),
            );

            console.log("Register result:", result);

            if (registerUser.fulfilled.match(result)) {
                setFormData({ email: "", password: "", name: "" });
                setSuccess(
                    "Регистрация успешна! Обратитесь к администратору для получения прав доступа.",
                );
            }
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ email: "", password: "", name: "" });
        // Очищаем сообщения при переключении режима
        dispatch(clearError());
        setSuccess("");
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <h2 className={styles.authTitle}>{isLogin ? "Вход в систему" : "Регистрация"}</h2>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    {!isLogin && (
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Имя</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required={!isLogin}
                                className={styles.input}
                                placeholder="Введите ваше имя"
                            />
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={styles.input}
                            placeholder="Введите email"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className={styles.input}
                            placeholder="Введите пароль"
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    {success && <div className={styles.success}>{success}</div>}

                    <button type="submit" disabled={loading} className={styles.submitButton}>
                        {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
                    </button>
                </form>

                <div className={styles.toggleMode}>
                    <button type="button" onClick={toggleMode} className={styles.toggleButton}>
                        {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;
