import React from "react";
import Head from "next/head";
import PostCardExample from "../shared/components/PostCard/PostCard.example";

const PostCardDemoPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Демо карточки поста - Федерация спортивного ориентирования</title>
                <meta name="description" content="Демонстрация компонента карточки поста" />
            </Head>

            <main
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#ffffff",
                    paddingTop: "60px", // отступ для навигации
                }}
            >
                <PostCardExample />
            </main>
        </>
    );
};

export default PostCardDemoPage;
