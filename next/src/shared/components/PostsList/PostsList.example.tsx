import React, { useState, useCallback } from "react";
import PostsList from "./index";
import { Post } from "../../types/Post";

// Функция для получения изображений с Unsplash по категориям
const getImagesForPost = (id: number, index: number, categoryId: string) => {
    // Коллекции изображений по категориям
    const imageCollections = {
        competitions: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format", // бег в лесу
            "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop&auto=format", // спортсмены
            "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop&auto=format", // марафон
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format", // ориентирование
        ],
        travel: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format", // горы
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format", // лес
            "https://images.unsplash.com/photo-1464822759844-d150baec3e5e?w=800&h=600&fit=crop&auto=format", // горная тропа
            "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format", // зимний лес
        ],
        training: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format", // бег
            "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop&auto=format", // тренировка
            "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=600&fit=crop&auto=format", // групповая тренировка
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format", // спорт на природе
        ],
        news: [
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop&auto=format", // новости
            "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&h=600&fit=crop&auto=format", // события
            "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=600&fit=crop&auto=format", // информация
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop&auto=format", // пресса
        ],
    };

    // Каждый третий пост без изображений
    if (index % 3 === 0) {
        return [];
    }

    const categoryImages =
        imageCollections[categoryId as keyof typeof imageCollections] || imageCollections.news;
    const mainImageIndex = (id - 1) % categoryImages.length;

    const images = [
        {
            id: `img-${id}-1`,
            url: categoryImages[mainImageIndex],
            alt: `Изображение для поста ${id}`,
            isMain: true,
        },
    ];

    // Каждый второй пост с дополнительными изображениями
    if (index % 2 === 0) {
        const secondImageIndex = (mainImageIndex + 1) % categoryImages.length;
        // images.push({
        //     id: `img-${id}-2`,
        //     url: categoryImages[secondImageIndex],
        //     alt: `Дополнительное изображение для поста ${id}`,
        // });

        // Каждый четвертый пост с еще большим количеством изображений (для демонстрации карусели)
        if (index % 4 === 0) {
            const thirdImageIndex = (mainImageIndex + 2) % categoryImages.length;
            const fourthImageIndex = (mainImageIndex + 3) % categoryImages.length;

            // images.push(
            //     {
            //         id: `img-${id}-3`,
            //         url: categoryImages[thirdImageIndex],
            //         alt: `Третье изображение для поста ${id}`,
            //     },
            //     {
            //         id: `img-${id}-4`,
            //         url: categoryImages[fourthImageIndex],
            //         alt: `Четвертое изображение для поста ${id}`,
            //     },
            // );
        }
    }

    return images;
};

// Генератор тестовых постов
const generateMockPosts = (startId: number, count: number): Post[] => {
    const categories = [
        { id: "competitions", name: "Соревнования", icon: "🏃‍♂️", color: "#28a745" },
        { id: "travel", name: "Путешествия", icon: "🎿", color: "#17a2b8" },
        { id: "training", name: "Тренировки", icon: "💪", color: "#ffc107" },
        { id: "news", name: "Новости", icon: "📰", color: "#6f42c1" },
    ];

    return Array.from({ length: count }, (_, index) => {
        const id = startId + index;
        const category = categories[index % categories.length];

        return {
            id: id.toString(),
            title: `Пост номер ${id}: ${category.name}`,
            text: `Это содержимое поста номер ${id}. Здесь может быть длинный текст с описанием события, соревнования или новости.<br>
Второй абзац с дополнительной информацией. Можно добавить ссылки, например: <a href="https://example.com">Подробнее здесь</a>.<br>
Третий абзац для демонстрации обрезки текста. Этот текст должен быть достаточно длинным, чтобы сработала функция "Читать далее".`,
            createdAt: new Date(2024, 0, id, 10, 0, 0).toISOString(), // фиксированная дата для SSR
            updatedAt: new Date(2024, 0, id, 10, 30, 0).toISOString(),
            author: "Автор поста",
            images: getImagesForPost(id, index, category.id),
            category,
        };
    });
};

const PostsListExample: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(() => generateMockPosts(1, 10));
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = useCallback(() => {
        if (loading) return;

        setLoading(true);

        // Симуляция загрузки с сервера
        setTimeout(() => {
            const newPosts = generateMockPosts(posts.length + 1, 5);
            setPosts((prev) => [...prev, ...newPosts]);
            setLoading(false);

            // Симуляция окончания постов после 50 штук
            if (posts.length >= 45) {
                setHasMore(false);
            }
        }, 1000);
    }, [posts.length, loading]);

    const handleEdit = useCallback((postId: string) => {
        console.log("Редактировать пост:", postId);
        // Здесь будет логика редактирования
    }, []);

    const handleDelete = useCallback((postId: string) => {
        console.log("Удалить пост:", postId);
        // Здесь будет логика удаления
        setPosts((prev) => prev.filter((post) => post.id !== postId));
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>Лента новостей</h1>

            <PostsList
                posts={posts}
                isAdmin={true} // для демонстрации админских функций
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                loading={loading}
            />
        </div>
    );
};

export default PostsListExample;
