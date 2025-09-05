import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import NewsPage from "../shared/pages/News";

const News: NextPage = () => {
    return (
        <>
            <Head>
                <title>Новости | Ваш сайт</title>
                <meta
                    name="description"
                    content="Последние новости, события и достижения. Будьте в курсе всех важных событий"
                />
                <meta
                    name="keywords"
                    content="новости, события, достижения, спорт, путешествия, тренировки, соревнования"
                />
                <meta
                    property="og:title"
                    content="Новости | Федерация спортивного ориентирования Костромской области"
                />
                <meta
                    property="og:description"
                    content="Последние новости, события и достижения. Будьте в курсе всех важных событий"
                />
                <meta property="og:type" content="website" />
            </Head>
            <NewsPage />
        </>
    );
};

export default News;
