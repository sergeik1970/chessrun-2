import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { fetchPosts, fetchCategories } from "../../store/slices/posts";
import PostsList from "../PostsList";

const PostsContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { posts, categories, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    // Преобразуем ServerPost[] в Post[] для компонента PostsList
    const adaptedPosts = useMemo(() => {
        return posts.map((post) => ({
            id: post.id.toString(),
            title: post.title,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            author: post.author?.name || "Неизвестный автор",
            images: (post.images || []).map((img) => ({
                id: img.id.toString(),
                url: img.url || `http://localhost:3001/api/news/${post.id}/images/${img.id}`,
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
    }, [posts, categories]);

    if (error) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p>Ошибка загрузки постов: {error}</p>
                <button onClick={() => dispatch(fetchPosts())}>Попробовать снова</button>
            </div>
        );
    }

    return (
        <PostsList posts={adaptedPosts} loading={loading} hasMore={false} onLoadMore={() => {}} />
    );
};

export default PostsContainer;
