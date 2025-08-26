import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApiUrl, API_ENDPOINTS } from "../../config/api";

export interface PostImage {
    id: number;
    file: string; // base64 данные
    mimeType?: string; // MIME тип изображения
    originalName?: string; // оригинальное имя файла
    alt?: string;
    isMain: boolean;
}

export interface PostAuthor {
    id: number;
    name: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    category: 'travel' | 'competition' | 'training';
    link?: string;
    author?: PostAuthor;
    images?: PostImage[];
    createdAt: string;
    updatedAt: string;
}

export interface PostCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
}

interface PostsState {
    posts: Post[];
    categories: PostCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    categories: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (category?: string) => {
        const url = category 
            ? createApiUrl(`${API_ENDPOINTS.news.list}?category=${category}`)
            : createApiUrl(API_ENDPOINTS.news.list);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке постов");
        }
        return response.json();
    }
);

export const fetchCategories = createAsyncThunk(
    "posts/fetchCategories",
    async () => {
        const response = await fetch(createApiUrl(API_ENDPOINTS.news.categories));
        if (!response.ok) {
            throw new Error("Ошибка при загрузке категорий");
        }
        return response.json();
    }
);

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (postData: { title: string; body: string; category: string; link?: string }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.create), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при создании поста");
            }

            return response.json();
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    }
);

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ id, ...postData }: { id: number; title: string; body: string; category: string; link?: string }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.update(id)), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при обновлении поста");
            }

            return response.json();
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.delete(id)), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при удалении поста");
            }

            return id;
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    }
);

export const uploadPostImages = createAsyncThunk(
    "posts/uploadImages",
    async ({ postId, files }: { postId: number; files: File[] }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            
            console.log('Uploading files:', files.length, files.map(f => f.name));
            files.forEach((file, index) => {
                console.log(`Appending file ${index}:`, file.name, file.size);
                formData.append('files', file);
            });

            const response = await fetch(createApiUrl(API_ENDPOINTS.news.uploadImages(postId)), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при загрузке изображений");
            }

            return response.json();
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch categories
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            // Create post
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update post
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            // Delete post
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            // Upload images
            .addCase(uploadPostImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadPostImages.fulfilled, (state, action) => {
                state.loading = false;
                // После загрузки изображений нужно обновить список постов
                // Это будет сделано в компоненте через fetchPosts
            })
            .addCase(uploadPostImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;