import React from "react";
import Head from "next/head";
import Navigation from "../shared/components/Navigation";
import Footer from "../shared/components/Footer";
import SitemapPage from "../shared/pages/Sitemap";

const Sitemap: React.FC = () => {
    return (
        <>
            <Head>
                <title>Карта сайта - Шахматы на бегу</title>
                <meta
                    name="description"
                    content="Карта сайта - навигация по всем разделам сайта любителей спортивного ориентирования"
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Карта сайта - Шахматы на бегу" />
                <meta
                    property="og:description"
                    content="Карта сайта - навигация по всем разделам сайта любителей спортивного ориентирования"
                />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation currentPath="/sitemap" />
            <SitemapPage />
            <Footer />
        </>
    );
};

export default Sitemap;
