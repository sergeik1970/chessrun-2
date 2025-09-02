import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApiUrl, API_ENDPOINTS } from "../../config/api";
import {
    Post,
    PostImage,
    PostFile,
    PostCategory,
    PostsState,
    CreatePostData,
    UpdatePostData,
} from "../../types/Post";

const initialState: PostsState = {
    posts: [],
    categories: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (category?: string) => {
    const url = category
        ? createApiUrl(`${API_ENDPOINTS.news.list}?category=${category}`)
        : createApiUrl(API_ENDPOINTS.news.list);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Ошибка при загрузке постов");
    }
    return response.json();
});

export const fetchCategories = createAsyncThunk("posts/fetchCategories", async () => {
    const response = await fetch(createApiUrl(API_ENDPOINTS.news.categories));
    if (!response.ok) {
        throw new Error("Ошибка при загрузке категорий");
    }
    return response.json();
});

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (postData: CreatePostData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.create), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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
    },
);

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (postData: UpdatePostData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { id, ...updateData } = postData;
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.update(id)), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при обновлении поста");
            }

            return response.json();
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    },
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.delete(id)), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
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
    },
);

export const uploadPostImages = createAsyncThunk(
    "posts/uploadImages",
    async ({ postId, files }: { postId: number; files: File[] }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            console.log(
                "Uploading files:",
                files.length,
                files.map((f) => f.name),
            );
            files.forEach((file, index) => {
                console.log(`Appending file ${index}:`, file.name, file.size);
                formData.append("files", file);
            });

            const response = await fetch(createApiUrl(API_ENDPOINTS.news.uploadImages(postId)), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
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
    },
);

export const deletePostImage = createAsyncThunk(
    "posts/deleteImage",
    async ({ postId, imageId }: { postId: number; imageId: number }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.deleteImage(imageId)), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при удалении изображения");
            }

            return { postId, imageId };
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    },
);

export const reorderPostImages = createAsyncThunk(
    "posts/reorderImages",
    async ({ postId, imageIds }: { postId: number; imageIds: number[] }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.reorderImages(postId)), {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageIds }),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при изменении порядка изображений");
            }

            return { postId, imageIds };
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    },
);

// Функции для работы с файлами
export const uploadPostFiles = createAsyncThunk(
    "posts/uploadFiles",
    async ({ postId, files }: { postId: number; files: File[] }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            // Конвертируем файлы в base64
            const filePromises = files.map(async (file) => {
                return new Promise<PostFile>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve({
                            id: Date.now() + Math.random(), // Временный ID
                            file: reader.result as string,
                            mimeType: file.type,
                            originalName: file.name,
                            title: file.name,
                            size: file.size,
                        });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            const fileData = await Promise.all(filePromises);

            const response = await fetch(createApiUrl(API_ENDPOINTS.news.uploadFiles(postId)), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ files: fileData }),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при загрузке файлов");
            }

            return response.json();
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    },
);

export const deletePostFile = createAsyncThunk(
    "posts/deleteFile",
    async ({ postId, fileId }: { postId: number; fileId: number }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(createApiUrl(API_ENDPOINTS.news.deleteFile(fileId)), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Ошибка при удалении файла");
            }

            return { postId, fileId };
        } catch (error) {
            return rejectWithValue("Ошибка сети");
        }
    },
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
                const index = state.posts.findIndex((post) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            // Delete post
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload);
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
            })
            // Delete image
            .addCase(deletePostImage.fulfilled, (state, action) => {
                const { postId, imageId } = action.payload;
                const post = state.posts.find((p) => p.id === postId);
                if (post && post.images) {
                    post.images = post.images.filter((img) => img.id !== imageId);
                }
            })
            .addCase(deletePostImage.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Reorder images
            .addCase(reorderPostImages.fulfilled, (state, action) => {
                const { postId, imageIds } = action.payload;
                const post = state.posts.find((p) => p.id === postId);
                if (post && post.images) {
                    // Переупорядочиваем изображения согласно новому порядку
                    const reorderedImages = imageIds
                        .map((id) => post.images!.find((img) => img.id === id))
                        .filter(Boolean) as PostImage[];

                    // Обновляем isMain флаг - первое изображение становится главным
                    reorderedImages.forEach((img, index) => {
                        img.isMain = index === 0;
                    });

                    post.images = reorderedImages;
                }
            })
            .addCase(reorderPostImages.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Upload files
            .addCase(uploadPostFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadPostFiles.fulfilled, (state, action) => {
                state.loading = false;
                // После загрузки файлов нужно обновить список постов
                // Это будет сделано в компоненте через fetchPosts
            })
            .addCase(uploadPostFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete file
            .addCase(deletePostFile.fulfilled, (state, action) => {
                const { postId, fileId } = action.payload;
                const post = state.posts.find((p) => p.id === postId);
                if (post && post.files) {
                    post.files = post.files.filter((file) => file.id !== fileId);
                }
            })
            .addCase(deletePostFile.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;
