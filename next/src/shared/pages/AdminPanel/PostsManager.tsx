import React, { ReactElement, useState } from "react";
import PostCard from "../../components/PostCard";
import { Post, PostCategory } from "../../types/Post";
import PostEditor from "./PostEditor";
import styles from "./PostsManager.module.scss";

// Временные данные для демонстрации
const mockCategories: PostCategory[] = [
    {
        id: "travel",
        name: "Путешествия",
        icon: "🎿",
        color: "#17a2b8",
    },
    {
        id: "news",
        name: "Новости",
        icon: "📰",
        color: "#ffc107",
    },
    {
        id: "training",
        name: "Тренировки",
        icon: "💪",
        color: "#6f42c1",
    },
];

const mockPosts: Post[] = [
    {
        id: "1",
        title: "Слёт ориентировщиков в Москве",
        text: `В Москве в Битцевском парке с 23 по 26 мая проходили Всероссийские соревнования по спортивному ориентированию "Слёт ориентировщиков". Наш маленький состав (так как старшие ребята сдают экзамены) активно принял в них участие.<br>
Все большие молодцы, все старались. Одни впервые пробовали свои силы, другие рисковали, бежали быстро и старались хорошо ориентироваться.`,
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
        category: mockCategories[0],
    },
    {
        id: "2",
        title: "Новогодние старты в Москве 2022",
        text: `Команда "Шахматы на бегу" официально открыла зимний сезон. В Битцевском парке Москвы в эти выходные 23 - 25 декабря 2022 года проходили традиционные Всероссийские соревнования по спортивному ориентированию на лыжах "НОВОГОДНИЕ СТАРТЫ".`,
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
        ],
        category: mockCategories[1],
    },
];

const PostsManager = (): ReactElement => {
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const handleCreatePost = () => {
        setEditingPost(null);
        setIsEditorOpen(true);
    };

    const handleEditPost = (postId: string) => {
        const post = posts.find((p) => p.id === postId);
        if (post) {
            setEditingPost(post);
            setIsEditorOpen(true);
        }
    };

    const handleDeletePost = (postId: string) => {
        if (window.confirm("Вы уверены, что хотите удалить этот пост?")) {
            setPosts(posts.filter((p) => p.id !== postId));
        }
    };

    const handleSavePost = (post: Post) => {
        if (editingPost) {
            // Редактирование существующего поста
            setPosts(posts.map((p) => (p.id === post.id ? post : p)));
        } else {
            // Создание нового поста
            const newPost = {
                ...post,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setPosts([newPost, ...posts]);
        }
        setIsEditorOpen(false);
        setEditingPost(null);
    };

    const handleCloseEditor = () => {
        setIsEditorOpen(false);
        setEditingPost(null);
    };

    // Фильтрация постов
    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || post.category.id === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={styles.postsManager}>
            <div className={styles.header}>
                <h2 className={styles.title}>Управление постами</h2>
                <button onClick={handleCreatePost} className={styles.createButton}>
                    + Создать пост
                </button>
            </div>

            <div className={styles.filters}>
                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Поиск постов..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.categoryFilter}>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.categorySelect}
                    >
                        <option value="all">Все категории</option>
                        {mockCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.icon} {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statNumber}>{posts.length}</span>
                    <span className={styles.statLabel}>Всего постов</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statNumber}>{filteredPosts.length}</span>
                    <span className={styles.statLabel}>Показано</span>
                </div>
            </div>

            <div className={styles.postsList}>
                {filteredPosts.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Посты не найдены</p>
                        {searchTerm || selectedCategory !== "all" ? (
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("all");
                                }}
                                className={styles.clearFiltersButton}
                            >
                                Очистить фильтры
                            </button>
                        ) : (
                            <button
                                onClick={handleCreatePost}
                                className={styles.createFirstPostButton}
                            >
                                Создать первый пост
                            </button>
                        )}
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <div key={post.id} className={styles.postItem}>
                            <PostCard
                                post={post}
                                isAdmin={true}
                                onEdit={handleEditPost}
                                onDelete={handleDeletePost}
                                maxTextLines={3}
                            />
                        </div>
                    ))
                )}
            </div>

            {isEditorOpen && (
                <PostEditor
                    post={editingPost}
                    categories={mockCategories}
                    onSave={handleSavePost}
                    onClose={handleCloseEditor}
                />
            )}
        </div>
    );
};

export default PostsManager;
