import React from "react";
import Head from "next/head";
import Navigation from "../shared/components/Navigation";
import Footer from "../shared/components/Footer";
import PrivacyPage from "../shared/pages/Privacy";

const Privacy: React.FC = () => {
    return (
        <>
            <Head>
                <title>Политика конфиденциальности | Шахматы на бегу</title>
                <meta
                    name="description"
                    content="Политика конфиденциальности информационного ресурса о спортивном ориентировании, тренировках и соревнованиях."
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Политика конфиденциальности - Шахматы на бегу" />
                <meta
                    property="og:description"
                    content="Политика конфиденциальности информационного ресурса о спортивном ориентировании."
                />
                <meta property="og:type" content="website" />
            </Head>
            <Navigation currentPath="/privacy" />
            <PrivacyPage />
            <Footer />
        </>
    );
};

export default Privacy;
