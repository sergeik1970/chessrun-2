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
                                <Link href="/contact" className={styles.link}>
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
                                <a href="/federation" className={styles.link}>
                                    Федерация
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vk.com/chessrun"
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
                        <div className={styles.bottomLinks}>
                            <a href="/privacy" className={styles.bottomLink}>
                                Политика конфиденциальности
                            </a>
                            <a href="/terms" className={styles.bottomLink}>
                                Условия использования
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
