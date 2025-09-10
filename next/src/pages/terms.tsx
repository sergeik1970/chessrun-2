import React from "react";
import Head from "next/head";
import Navigation from "../shared/components/Navigation";
import Footer from "../shared/components/Footer";
import TermsPage from "../shared/pages/Terms";

const Terms: React.FC = () => {
    return (
        <>
            <Head>
                <title>Условия использования | Шахматы на бегу</title>
                <meta
                    name="description"
                    content="Условия использования информационного ресурса о спортивном ориентировании, тренировках и соревнованиях."
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Условия использования - Шахматы на бегу" />
                <meta
                    property="og:description"
                    content="Условия использования информационного ресурса о спортивном ориентировании."
                />
                <meta property="og:type" content="website" />
            </Head>
            <Navigation currentPath="/terms" />
            <TermsPage />
            <Footer />
        </>
    );
};

export default Terms;
