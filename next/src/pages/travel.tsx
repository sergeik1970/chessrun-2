import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import TravelPage from "../shared/pages/Travel";

const Travel: NextPage = () => {
    return (
        <>
            <Head>
                <title>Путешествия | Шахматы на бегу</title>
                <meta
                    name="description"
                    content="Увлекательные истории о путешествиях, приключениях и открытиях новых мест"
                />
                <meta name="keywords" content="путешествия, туризм, приключения, отдых" />
                <meta property="og:title" content="Путешествия | Ваш сайт" />
                <meta
                    property="og:description"
                    content="Увлекательные истории о путешествиях, приключениях и открытиях новых мест"
                />
                <meta property="og:type" content="website" />
            </Head>
            <TravelPage />
        </>
    );
};

export default Travel;
