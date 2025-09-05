import React from "react";
import Head from "next/head";
import Footer from "../shared/components/Footer";
import HomePage from "../shared/pages/Home";

const Main = () => {
    return (
        <>
            <Head>
                <title>Шахматы на бегу | Спортивное ориентирование Костромской области</title>
                <meta name="description" content="Открывай новые горизонты вместе с нами! Спортивное ориентирование, тренировки, соревнования, путешествия и походы в Костромской области." />
                <meta name="keywords" content="спортивное ориентирование, Кострома, тренировки, соревнования, путешествия, походы, активный отдых" />
                <meta property="og:title" content="Шахматы на бегу | Спортивное ориентирование Костромской области" />
                <meta property="og:description" content="Открывай новые горизонты вместе с нами! Спортивное ориентирование, тренировки, соревнования, путешествия и походы в Костромской области." />
                <meta property="og:type" content="website" />
            </Head>
            <main>
                <HomePage />
            </main>
            <Footer />
        </>
    );
};

export default Main;
