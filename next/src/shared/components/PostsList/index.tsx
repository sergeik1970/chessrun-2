import React, { useState, useEffect, useCallback } from "react";
import PostCard from "../PostCard";
import { Post } from "../../types/Post";
import styles from "./index.module.scss";
import postsStyles from "../../styles/posts.module.scss";

interface PostsListProps {
    posts: Post[];
    isAdmin?: boolean;
    onEdit?: (postId: string) => void;
    onDelete?: (postId: string) => void;
    onLoadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
}

const PostsList: React.FC<PostsListProps> = ({
    posts,
    isAdmin = false,
    onEdit,
    onDelete,
    onLoadMore,
    hasMore = false,
    loading = false,
}) => {
    const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

    const handleReadMore = useCallback((postId: string) => {
        setExpandedPosts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    }, []);

    // Infinite scroll logic
    useEffect(() => {
        if (!hasMore || loading || !onLoadMore) return;

        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight - 1000) {
                onLoadMore();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading, onLoadMore]);

    return (
        <div className={postsStyles.postsList}>
            {posts.map((post) => (
                <div key={post.id} className={postsStyles.postItem}>
                    <PostCard
                        post={post}
                        isAdmin={isAdmin}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onReadMore={handleReadMore}
                        showFullText={expandedPosts.has(post.id)}
                    />
                </div>
            ))}

            {loading && (
                <div className={postsStyles.loading}>
                    <div className={postsStyles.spinner}></div>
                    <p>Загрузка постов...</p>
                </div>
            )}

            {!hasMore && posts.length > 0 && (
                <div className={styles.endMessage}>
                    <p>Все посты загружены</p>
                </div>
            )}

            {posts.length === 0 && !loading && (
                <div className={postsStyles.emptyState}>
                    <div className={postsStyles.emptyIcon}>📝</div>
                    <h3>Пока нет постов</h3>
                    <p>Скоро здесь появятся интересные посты!</p>
                </div>
            )}
        </div>
    );
};

export default PostsList;
