import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import clsx from "clsx";
interface NavigationProps {
    className?: string;
}

const Navigation: React.FC<NavigationProps> = () => {
    const openNavList = () => {
        const navList = document.querySelector(`.${styles["nav-list"]}`);
        navList?.classList.add(styles["open-nav-list"]);
    };

    const closeNavList = () => {
        const navList = document.querySelector(`.${styles["nav-list"]}`);
        navList?.classList.remove(styles["open-nav-list"]);
    };
    return (
        <>
            <div className={clsx(styles["nav-header"])}>
                <div className={clsx(styles["nav-header-content"])}>
                    <Link className={clsx(styles["nav-header-link"], styles["nav-main"])} href="/">
                        Шахматы на бегу
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/federation"
                    >
                        Федерация
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/news"
                    >
                        Новости
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/training"
                    >
                        Тренировки
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/competitions"
                    >
                        Соревнования
                    </Link>
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/travel"
                    >
                        Путешествия
                    </Link>
                    {/* <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/camping"
                    >
                        Походы
                    </Link> */}
                    <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/contacts"
                    >
                        Контакты
                    </Link>
                    {/* <Link
                        className={clsx(styles["nav-header-link"], styles["nav-section"])}
                        href="/posts-demo"
                        style={{ color: "#ff6b6b" }}
                    >
                        Демо постов
                    </Link> */}
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
                        <Link href="/">Шахматы на бегу</Link>
                    </li>
                    <li>
                        <Link href="/federation">Федерация</Link>
                    </li>
                    <li>
                        <Link href="/news">Новости</Link>
                    </li>
                    <li>
                        <Link href="/training">Тренировки</Link>
                    </li>
                    <li>
                        <Link href="/competitions">Соревнования</Link>
                    </li>
                    <li>
                        <Link href="/travel">Путешествия</Link>
                    </li>
                    <li>
                        <Link href="/contacts">Контакты</Link>
                    </li>
                    {/* <li>
                        <Link href="/posts-demo" style={{ color: "#ff6b6b" }}>
                            Демо постов
                        </Link>
                    </li> */}
                    {/* <li>
                        <Link href="/post-card-demo" style={{ color: "#ff6b6b" }}>
                            Демо карточки
                        </Link>
                    </li> */}
                </ul>
            </div>
        </>
    );
};

export default Navigation;
