import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import CompetitionsPage from "../shared/pages/Competitions";

const Competitions: NextPage = () => {
    return (
        <>
            <Head>
                <title>Соревнования | Шахматы на бегу</title>
                <meta
                    name="description"
                    content="Спортивные соревнования, турниры и состязания. Результаты, новости и анонсы предстоящих событий"
                />
                <meta
                    name="keywords"
                    content="соревнования, спорт, турниры, состязания, результаты"
                />
                <meta property="og:title" content="Соревнования | Ваш сайт" />
                <meta
                    property="og:description"
                    content="Спортивные соревнования, турниры и состязания. Результаты, новости и анонсы предстоящих событий"
                />
                <meta property="og:type" content="website" />
            </Head>
            <CompetitionsPage />
        </>
    );
};

export default Competitions;
