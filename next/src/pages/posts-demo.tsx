import React, { useState } from "react";
import Head from "next/head";
import PostsList from "../shared/components/PostsList";
import { Post } from "../shared/types";

/**
 * Демо-страница для компонента PostsList
 */
const PostsDemoPage: React.FC = () => {
    const [loading, setLoading] = useState(false);

    // Пример данных постов для демонстрации
    const samplePosts: Post[] = [
        {
            id: "1",
            title: "Чемпионат России по спортивному ориентированию 2024",
            text: "Приглашаем всех участников на главное соревнование года! Чемпионат России по спортивному ориентированию пройдет в живописных местах Карелии. Ожидается участие более 500 спортсменов из всех регионов страны.",
            createdAt: "2024-04-15T10:00:00Z",
            updatedAt: "2024-04-15T10:00:00Z",
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
            ],
        },
        {
            id: "2",
            title: "Тренировочные сборы в Подмосковье",
            text: "Объявляем о проведении тренировочных сборов для спортсменов всех возрастов. Сборы пройдут на базе спортивного комплекса в Подмосковье с 20 по 25 мая.",
            createdAt: "2024-04-10T14:30:00Z",
            updatedAt: "2024-04-10T14:30:00Z",
            category: {
                id: "training",
                name: "Тренировки",
                icon: "💪",
                color: "#2196F3",
            },
        },
        {
            id: "3",
            title: "Новости федерации: обновление правил",
            text: "Федерация спортивного ориентирования России информирует об обновлении правил соревнований. Изменения вступают в силу с 1 июня 2024 года.",
            createdAt: "2024-04-05T09:15:00Z",
            updatedAt: "2024-04-05T09:15:00Z",
            category: {
                id: "news",
                name: "Новости",
                icon: "📰",
                color: "#9C27B0",
            },
            files: [
                {
                    id: "1",
                    file: "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA4IFRmCjEwMCA3MDAgVGQKKE5ldyBSdWxlcykgVGoKRVQKc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAyNDUgMDAwMDAgbiAKMDAwMDAwMDMyMiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQxNAolJUVPRg==",
                    mimeType: "application/pdf",
                    originalName: "new_rules.pdf",
                    title: "Новые правила соревнований",
                    size: 2048,
                },
            ],
        },
    ];

    const handleEdit = (postId: string) => {
        console.log("Редактировать пост:", postId);
    };

    const handleDelete = (postId: string) => {
        console.log("Удалить пост:", postId);
    };

    const handleLoadMore = () => {
        setLoading(true);
        // Имитация загрузки
        setTimeout(() => {
            setLoading(false);
            console.log("Загружены дополнительные посты");
        }, 2000);
    };

    return (
        <>
            <Head>
                <title>Демо компонентов постов - Федерация спортивного ориентирования</title>
                <meta
                    name="description"
                    content="Демонстрация компонентов для отображения постов"
                />
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
                        Демонстрация компонента PostsList
                    </h1>

                    <div style={{ marginBottom: "40px" }}>
                        <h2 style={{ color: "#666", marginBottom: "20px" }}>Обычный режим</h2>
                        <PostsList
                            posts={samplePosts}
                            loading={loading}
                            hasMore={true}
                            onLoadMore={handleLoadMore}
                        />
                    </div>

                    <div style={{ marginBottom: "40px" }}>
                        <h2 style={{ color: "#666", marginBottom: "20px" }}>Админский режим</h2>
                        <PostsList
                            posts={samplePosts}
                            isAdmin={true}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            loading={loading}
                            hasMore={false}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default PostsDemoPage;
