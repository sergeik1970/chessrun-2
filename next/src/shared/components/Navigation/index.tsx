import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import clsx from "clsx";
import { NavigationProps } from "../../types/components";
import { useYandexMetrika } from "../../hooks/useYandexMetrika";

const Navigation: React.FC<NavigationProps> = ({ currentPath, isAdmin }) => {
    const { trackButtonClick } = useYandexMetrika();

    const openNavList = () => {
        const navList = document.querySelector(`.${styles["nav-list"]}`);
        navList?.classList.add(styles["open-nav-list"]);
        trackButtonClick("mobile_menu_open", "navigation");
    };

    const closeNavList = () => {
        const navList = document.querySelector(`.${styles["nav-list"]}`);
        navList?.classList.remove(styles["open-nav-list"]);
        trackButtonClick("mobile_menu_close", "navigation");
    };

    const handleNavClick = (section: string) => {
        trackButtonClick(`nav_${section}`, "navigation");
    };
    return (
        <>
            <div className={clsx(styles["nav-header"])}>
                <div className={clsx(styles["nav-header-content"])}>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-main"])}
                        href="/"
                        onClick={() => handleNavClick("home")}
                    >
                        Шахматы на бегу
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/federation"
                        onClick={() => handleNavClick("federation")}
                    >
                        Федерация
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/news"
                        onClick={() => handleNavClick("news")}
                    >
                        Новости
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/training"
                        onClick={() => handleNavClick("training")}
                    >
                        Тренировки
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/competitions"
                        onClick={() => handleNavClick("competitions")}
                    >
                        Соревнования
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/travel"
                        onClick={() => handleNavClick("travel")}
                    >
                        Путешествия
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/contacts"
                        onClick={() => handleNavClick("contacts")}
                    >
                        Контакты
                    </Link>
                    <svg
                        className={clsx(styles["menu"])}
                        onClick={openNavList}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </div>
            </div>

            <div className={clsx(styles["nav-list"])}>
                <svg
                    className={clsx(styles["close-menu"])}
                    onClick={closeNavList}
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                >
                    <path d="M32,4A28,28,0,1,0,60,32,28,28,0,0,0,32,4ZM43.31,37.66a4,4,0,0,1-5.66,5.66L32,37.66l-5.66,5.66a4,4,0,0,1-5.66-5.66L26.34,32l-5.66-5.66a4,4,0,0,1,5.66-5.66L32,26.34l5.66-5.66a4,4,0,0,1,5.66,5.66L37.66,32Z" />
                </svg>
                <ul>
                    <li>
                        <Link
                            onClick={() => {
                                closeNavList();
                                handleNavClick("mobile_home");
                            }}
                            href="/"
                        >
                            Шахматы на бегу
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => {
                                closeNavList();
                                handleNavClick("mobile_federation");
                            }}
                            href="/federation"
                        >
                            Федерация
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => {
                                closeNavList();
                                handleNavClick("mobile_news");
                            }}
                            href="/news"
                        >
                            Новости
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => {
                                closeNavList();
                                handleNavClick("mobile_training");
                            }}
                            href="/training"
                        >
                            Тренировки
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => {
                                closeNavList();
                                handleNavClick("mobile_competitions");
                            }}
                            href="/competitions"
                        >
                            Соревнования
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => {
                                closeNavList();
                                handleNavClick("mobile_travel");
                            }}
                            href="/travel"
                        >
                            Путешествия
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => {
                                closeNavList();
                                handleNavClick("mobile_contacts");
                            }}
                            href="/contacts"
                        >
                            Контакты
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => {
                                closeNavList();
                                handleNavClick("mobile_admin");
                            }}
                            href="/admin"
                        >
                            Для администраторов
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navigation;
