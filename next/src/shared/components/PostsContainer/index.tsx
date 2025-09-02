import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { fetchPosts } from "../../store/slices/posts";
import PostsList from "../PostsList";

const PostsContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (error) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p>Ошибка загрузки постов: {error}</p>
                <button onClick={() => dispatch(fetchPosts())}>
                    Попробовать снова
                </button>
            </div>
        );
    }

    return (
        <PostsList
            posts={posts || []}
            loading={loading}
            hasMore={false}
            onLoadMore={() => {}}
        />
    );
};

export default PostsContainer;