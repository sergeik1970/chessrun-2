import React from "react";
import Head from "next/head";
import PostCard from "../shared/components/PostCard";
import { Post } from "../shared/types";

/**
 * Демо-страница для компонента PostCard
 */
const PostCardDemoPage: React.FC = () => {
    // Пример данных поста для демонстрации
    const samplePost: Post = {
        id: "1",
        title: "Чемпионат России по спортивному ориентированию 2024",
        text: "Приглашаем всех участников на главное соревнование года! Чемпионат России по спортивному ориентированию пройдет в живописных местах Карелии. Ожидается участие более 500 спортсменов из всех регионов страны.\n\nПрограмма соревнований включает:\n- Спринт\n- Средняя дистанция\n- Длинная дистанция\n- Эстафета\n\nРегистрация открыта до 15 мая. Не упустите возможность принять участие в этом грандиозном событии!",
        createdAt: "2024-04-15T10:00:00Z",
        updatedAt: "2024-04-15T10:00:00Z",
        author: "Администратор",
        category: {
            id: "competition",
            name: "Соревнования",
            icon: "🏆",
            color: "#ff6b35",
        },
        images: [
            {
                id: "1",
                url: "https://via.placeholder.com/800x600/4CAF50/white?text=Карелия",
                alt: "Живописные места Карелии",
                width: 800,
                height: 600,
                isMain: true,
            },
            {
                id: "2",
                url: "https://via.placeholder.com/800x600/2196F3/white?text=Соревнования",
                alt: "Участники соревнований",
                width: 800,
                height: 600,
            },
        ],
        files: [
            {
                id: "1",
                file: "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA4IFRmCjEwMCA3MDAgVGQKKFJlZ2lzdHJhdGlvbiBGb3JtKSBUagpFVApzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0NSAwMDAwMCBuIAowMDAwMDAwMzIyIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDE0CiUlRU9G",
                mimeType: "application/pdf",
                originalName: "registration_form.pdf",
                title: "Форма регистрации",
                size: 1024,
            },
        ],
    };

    const handleEdit = (postId: string) => {
        console.log("Редактировать пост:", postId);
    };

    const handleDelete = (postId: string) => {
        console.log("Удалить пост:", postId);
    };

    const handleReadMore = (postId: string) => {
        console.log("Читать далее:", postId);
    };

    return (
        <>
            <Head>
                <title>Демо карточки поста - Федерация спортивного ориентирования</title>
                <meta name="description" content="Демонстрация компонента карточки поста" />
            </Head>

            <main
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f5f5f5",
                    paddingTop: "80px",
                    padding: "80px 20px 40px",
                }}
            >
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>
                        Демонстрация компонента PostCard
                    </h1>

                    <div style={{ marginBottom: "40px" }}>
                        <h2 style={{ color: "#666", marginBottom: "20px" }}>Обычный режим</h2>
                        <PostCard post={samplePost} onReadMore={handleReadMore} />
                    </div>

                    <div style={{ marginBottom: "40px" }}>
                        <h2 style={{ color: "#666", marginBottom: "20px" }}>Админский режим</h2>
                        <PostCard
                            post={samplePost}
                            isAdmin={true}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onReadMore={handleReadMore}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default PostCardDemoPage;
