import React from "react";
import Head from "next/head";
import Footer from "../shared/components/Footer";
import PostsContainer from "../shared/components/PostsContainer";

const Main = () => {
    return (
        <>
            <Head>
                <title>Главная - Спортивный клуб</title>
                <meta name="description" content="Добро пожаловать в наш спортивный клуб" />
            </Head>
            <main>
                <PostsContainer />
            </main>
            <Footer />
        </>
    );
};

export default Main;
