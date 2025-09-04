import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import TrainingPage from "../shared/pages/Training";

const Training: NextPage = () => {
    return (
        <>
            <Head>
                <title>Тренировки | Ваш сайт</title>
                <meta
                    name="description"
                    content="Тренировочные программы, методики и советы для спортивного ориентирования и активного образа жизни"
                />
                <meta name="keywords" content="тренировки, спорт, ориентирование, фитнес, подготовка" />
                <meta property="og:title" content="Тренировки | Ваш сайт" />
                <meta
                    property="og:description"
                    content="Тренировочные программы, методики и советы для спортивного ориентирования и активного образа жизни"
                />
                <meta property="og:type" content="website" />
            </Head>
            <TrainingPage />
        </>
    );
};

export default Training;