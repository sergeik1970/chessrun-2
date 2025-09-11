import React, { ReactElement } from "react";
import Link from "next/link";
import styles from "./index.module.scss";

const SitemapPage = (): ReactElement => {
    return (
        <div className={styles.sitemapPage}>
            {/* Основной контент */}
            <section className={styles.mainContent}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.pageHeader}>
                            <h1 className={styles.pageTitle}>Карта сайта</h1>
                            <p className={styles.pageSubtitle}>Навигация по всем разделам сайта</p>
                        </div>
                        <div className={styles.sitemapGrid}>
                            {/* Основные разделы */}
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Основные разделы</h2>
                                <ul className={styles.linkList}>
                                    <li>
                                        <Link href="/" className={styles.link}>
                                            <span className={styles.linkTitle}>Главная</span>
                                            <span className={styles.linkDescription}>
                                                Добро пожаловать на сайт клуба спортивного
                                                ориентирования
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/news" className={styles.link}>
                                            <span className={styles.linkTitle}>Новости</span>
                                            <span className={styles.linkDescription}>
                                                Актуальные новости клуба спортивного ориентирования
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/travel" className={styles.link}>
                                            <span className={styles.linkTitle}>Путешествия</span>
                                            <span className={styles.linkDescription}>
                                                Отчеты о походах, путешествиях и приключениях
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/competitions" className={styles.link}>
                                            <span className={styles.linkTitle}>Соревнования</span>
                                            <span className={styles.linkDescription}>
                                                Календарь соревнований и результаты
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/training" className={styles.link}>
                                            <span className={styles.linkTitle}>Тренировки</span>
                                            <span className={styles.linkDescription}>
                                                Расписание и прогресс тренировок
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Информационные разделы */}
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Информация</h2>
                                <ul className={styles.linkList}>
                                    <li>
                                        <Link href="/federation" className={styles.link}>
                                            <span className={styles.linkTitle}>Федерация</span>
                                            <span className={styles.linkDescription}>
                                                Информация о федерации спортивного ориентирования
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contacts" className={styles.link}>
                                            <span className={styles.linkTitle}>Контакты</span>
                                            <span className={styles.linkDescription}>
                                                Как с нами связаться
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Правовая информация */}
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Правовая информация</h2>
                                <ul className={styles.linkList}>
                                    <li>
                                        <Link href="/privacy" className={styles.link}>
                                            <span className={styles.linkTitle}>
                                                Политика конфиденциальности
                                            </span>
                                            <span className={styles.linkDescription}>
                                                Информация о сборе и использовании данных
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms" className={styles.link}>
                                            <span className={styles.linkTitle}>
                                                Условия использования
                                            </span>
                                            <span className={styles.linkDescription}>
                                                Правила пользования информационным ресурсом
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sitemap" className={styles.link}>
                                            <span className={styles.linkTitle}>Карта сайта</span>
                                            <span className={styles.linkDescription}>
                                                Навигация по всем разделам сайта
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Внешние ресурсы */}
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Внешние ресурсы</h2>
                                <ul className={styles.linkList}>
                                    <li>
                                        <a
                                            href="https://vk.ru/public143799052"
                                            className={styles.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className={styles.linkTitle}>
                                                Группа ВКонтакте
                                            </span>
                                            <span className={styles.linkDescription}>
                                                Наше сообщество в социальной сети
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Небольшая ссылка для администраторов */}
                        <div className={styles.adminLink}>
                            <Link href="/admin">Для администраторов</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SitemapPage;
