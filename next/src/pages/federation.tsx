import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import FederationPage from "../shared/pages/Federation";

const Federation: NextPage = () => {
    return (
        <>
            <Head>
                <title>Федерация | Федерация спортивного ориентирования Костромской области</title>
                <meta
                    name="description"
                    content="Федерация спортивного ориентирования Костромской области - официальная информация, документы, руководство и контакты"
                />
                <meta
                    name="keywords"
                    content="федерация, спортивное ориентирование, Кострома, документы, устав, руководство, контакты"
                />
                <meta
                    property="og:title"
                    content="Федерация | Федерация спортивного ориентирования Костромской области"
                />
                <meta
                    property="og:description"
                    content="Федерация спортивного ориентирования Костромской области - официальная информация, документы, руководство и контакты"
                />
                <meta property="og:type" content="website" />
            </Head>
            <FederationPage />
        </>
    );
};

export default Federation;
