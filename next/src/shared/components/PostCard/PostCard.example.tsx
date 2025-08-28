import React from "react";
import PostCard from "./index";
import { Post } from "../../types/Post";

// Пример данных на основе реальных постов
const examplePosts: Post[] = [
    {
        id: "1",
        title: "Слёт ориентировщиков в Москве",
        text: `В Москве в Битцевском парке с 23 по 26 мая проходили Всероссийские соревнования по спортивному ориентированию "Слёт ориентировщиков". Наш маленький состав (так как старшие ребята сдают экзамены) активно принял в них участие.<br>
Все большие молодцы, все старались. Одни впервые пробовали свои силы, другие рисковали, бежали быстро и старались хорошо ориентироваться. Другие старались пройти свою дистанцию без ошибок, но пока медленно. Но мы ещё потренируемся и обязательно выступим ещё лучше. Результаты можно посмотреть здесь.<br>
<a href="https://orgeo.ru/event/42959">Результаты</a>`,
        createdAt: "2025-05-26T10:00:00Z",
        updatedAt: "2025-05-26T10:30:00Z",
        author: "Тренер команды",
        images: [
            {
                id: "1",
                url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format",
                alt: "Участники соревнований",
                isMain: true,
            },
        ],
        category: {
            id: "competitions",
            name: "Соревнования",
            icon: "🏃‍♂️",
            color: "#007bff",
        },
    },
    {
        id: "2",
        title: "Новогодние старты в Москве 2022",
        text: `Команда "Шахматы на бегу" официально открыла зимний сезон. В Битцевском парке Москвы в эти выходные 23 - 25 декабря 2022 года проходили традиционные Всероссийские соревнования по спортивному ориентированию на лыжах "НОВОГОДНИЕ СТАРТЫ" и Всероссийский фестиваль юных ориентировщиков.<br>
Участникам пришлось в сложных погодных условиях преодолевать спринтерскую дистанцию и классику. В первый день на улице +6, а на следующий день -8 градусов.<br>
Пока мы не можем похвастаться высокими результатами, но наши девушки в группе Ж до 15 выступают достаточно успешно и уверенно занимают середину рейтинга.<br>
У юношей более сложное противостояния и нам необходимо ещё более усердно готовиться.<br>
Каждые такие старты приближают нас к заветной мечте.<br>
А ещё, это Новогоднее настроение - до Нового года осталось 5 дней. Мы побывали на Праздничной Красной площади и на знаменитом катке ВДНХ.`,
        createdAt: "2022-12-25T14:00:00Z",
        updatedAt: "2022-12-25T14:15:00Z",
        author: "Тренер команды",
        images: [
            {
                id: "2",
                url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format",
                alt: "Команда на соревнованиях",
                isMain: true,
            },
            {
                id: "3",
                url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
                alt: "Участники на старте",
            },
            {
                id: "4",
                url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
                alt: "Лыжная трасса",
            },
            {
                id: "5",
                url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop&auto=format",
                alt: "Награждение",
            },
            {
                id: "6",
                url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&auto=format",
                alt: "Красная площадь",
            },
            {
                id: "7",
                url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
                alt: "Каток ВДНХ",
            },
            {
                id: "8",
                url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&auto=format",
                alt: "Новогодняя Москва",
            },
            {
                id: "9",
                url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop&auto=format",
                alt: "Команда в Москве",
            },
            {
                id: "10",
                url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&auto=format",
                alt: "Праздничная атмосфера",
            },
        ],
        category: {
            id: "travel",
            name: "Путешествия",
            icon: "🎿",
            color: "#17a2b8",
        },
    },
    {
        id: "3",
        title: "Короткая новость",
        text: "Пример короткого поста без изображений.",
        createdAt: "2024-01-05T09:00:00Z",
        updatedAt: "2024-01-05T09:05:00Z",
        author: "Автор",
        images: [],
        category: {
            id: "news",
            name: "Новости",
            icon: "📰",
            color: "#ffc107",
        },
    },
];

const PostCardExample: React.FC = () => {
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
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h1>Примеры постов</h1>

            {examplePosts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    isAdmin={true} // для демонстрации админских кнопок
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onReadMore={handleReadMore}
                />
            ))}
        </div>
    );
};

export default PostCardExample;
