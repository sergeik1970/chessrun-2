import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Основная информация */}
                    <div className={styles.mainSection}>
                        <div className={styles.brand}>
                            <h3 className={styles.brandTitle}>Шахматы на бегу</h3>
                            <p className={styles.brandDescription}>
                                Открывай новые горизонты вместе с нами! Спортивное ориентирование,
                                тренировки, соревнования, путешествия и походы — всё это объединяет
                                тех, кто любит активный образ жизни и новые открытия.
                            </p>
                        </div>
                    </div>

                    {/* Разделы */}
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Разделы</h4>
                        <ul className={styles.linkList}>
                            <li>
                                <Link href="/" className={styles.link}>
                                    Главная
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className={styles.link}>
                                    Новости
                                </Link>
                            </li>
                            <li>
                                <Link href="/travel" className={styles.link}>
                                    Путешествия
                                </Link>
                            </li>
                            <li>
                                <Link href="/competitions" className={styles.link}>
                                    Соревнования
                                </Link>
                            </li>
                            <li>
                                <Link href="/training" className={styles.link}>
                                    Тренировки
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts" className={styles.link}>
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Полезное */}
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Полезное</h4>
                        <ul className={styles.linkList}>
                            <li>
                                <Link href="/federation" className={styles.link}>
                                    Федерация
                                </Link>
                            </li>
                            <li>
                                <Link href="/sitemap" className={styles.link}>
                                    Карта сайта
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://vk.ru/public143799052"
                                    className={styles.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Группа ВКонтакте
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Спонсоры */}
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Спонсоры</h4>
                        <p className={styles.sponsorText}>
                            Стань нашим спонсором и поддержи развитие спорта!
                        </p>
                    </div>
                </div>

                {/* Нижняя часть */}
                <div className={styles.bottom}>
                    <div className={styles.bottomContent}>
                        <p className={styles.copyright}>
                            © {currentYear} Шахматы на бегу. Все права защищены.
                        </p>
                        <p className={styles.developer}>
                            Создано{" "}
                            <a
                                href="https://kdsv.ru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.developerLink}
                            >
                                KDSV
                            </a>
                        </p>
                        <div className={styles.bottomLinks}>
                            <Link href="/privacy" className={styles.bottomLink}>
                                Политика конфиденциальности
                            </Link>
                            <Link href="/terms" className={styles.bottomLink}>
                                Условия использования
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
