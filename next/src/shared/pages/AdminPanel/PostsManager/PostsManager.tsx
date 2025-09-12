import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/store";
import { fetchPosts, fetchCategories, deletePost } from "../../../store/slices/posts";
import { Post, ServerPost } from "../../../types/Post";
import PostCard from "../../../components/PostCard";
import PostEditor from "../PostEditor";
import { getImageUrlFromPost } from "../../../utils/imageUtils";
import styles from "./PostsManager.module.scss";

const PostsManager = (): ReactElement => {
    const dispatch = useDispatch();
    const { posts, categories, loading, error } = useSelector((state) => state.posts);

    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<ServerPost | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

    useEffect(() => {
        // Загружаем все посты и категории при монтировании компонента
        dispatch(fetchPosts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCreatePost = () => {
        setEditingPost(null);
        setIsEditorOpen(true);
    };

    const handleEditPost = (postId: string) => {
        const post = posts.find((p) => p.id.toString() === postId);
        if (post) {
            setEditingPost(post);
            setIsEditorOpen(true);
        }
    };

    const handleDeletePost = async (postId: string) => {
        if (window.confirm("Вы уверены, что хотите удалить этот пост?")) {
            try {
                setDeletingPostId(postId);
                await dispatch(deletePost(parseInt(postId)));
                // Перезагружаем посты после успешного удаления
                dispatch(fetchPosts());
            } catch (error) {
                console.error("Ошибка при удалении поста:", error);
            } finally {
                setDeletingPostId(null);
            }
        }
    };

    const handleSavePost = () => {
        setIsEditorOpen(false);
        setEditingPost(null);
        // Перезагружаем посты после сохранения
        dispatch(fetchPosts());
    };

    const handleCloseEditor = () => {
        setIsEditorOpen(false);
        setEditingPost(null);
    };

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category);
    };

    // Фильтрация постов по поиску и категории на клиентской стороне
    const filteredPosts = posts.filter((post) => {
        // Фильтр по категории
        if (selectedCategory !== "all" && post.category !== selectedCategory) {
            return false;
        }

        // Фильтр по поиску
        if (searchTerm) {
            return (
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.text.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return true;
    });

    // Преобразуем посты для PostCard (адаптируем типы)
    const adaptedPosts = filteredPosts.map((post) => ({
        id: post.id.toString(),
        title: post.title,
        text: post.text,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: post.author?.name || "Неизвестный автор",
        images: (post.images || []).map((img) => ({
            id: img.id.toString(),
            url: getImageUrlFromPost(post.id.toString(), img),
            alt: img.alt || "",
            isMain: img.isMain,
        })),
        files: (post.files || []).map((file) => ({
            id: file.id.toString(),
            mimeType: file.mimeType,
            originalName: file.originalName,
            title: file.title || file.originalName,
            size: file.size,
            url: file.url || `http://localhost:3001/api/news/${post.id}/files/${file.id}`,
        })),
        category: {
            id: post.category,
            name: categories.find((cat) => cat.id === post.category)?.name || post.category,
            icon: categories.find((cat) => cat.id === post.category)?.icon || "📝",
            color: categories.find((cat) => cat.id === post.category)?.color || "#666",
        },
    }));

    if (loading && posts.length === 0) {
        return (
            <div className={styles.postsManager}>
                <div className={styles.loading}>Загрузка постов...</div>
            </div>
        );
    }

    return (
        <div className={styles.postsManager}>
            <div className={styles.header}>
                <h2 className={styles.title}>Управление постами</h2>
            </div>

            <div className={styles.createSection}>
                <button onClick={handleCreatePost} className={styles.createButton}>
                    + Создать пост
                </button>
            </div>

            {error && <div className={styles.error}>Ошибка: {error}</div>}

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
                        onChange={(e) => handleCategoryFilter(e.target.value)}
                        className={styles.categorySelect}
                    >
                        <option value="all">Все категории</option>
                        {categories.map((category) => (
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
                    adaptedPosts.map((post) => (
                        <div key={post.id} className={styles.postItem}>
                            <PostCard
                                post={post}
                                isAdmin={true}
                                onEdit={handleEditPost}
                                onDelete={handleDeletePost}
                                maxTextLines={3}
                                isDeleting={deletingPostId === post.id}
                            />
                        </div>
                    ))
                )}
            </div>

            {isEditorOpen && (
                <PostEditor
                    post={editingPost}
                    onSave={handleSavePost}
                    onClose={handleCloseEditor}
                />
            )}
        </div>
    );
};

export default PostsManager;
