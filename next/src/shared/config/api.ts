export const API_BASE_URL =
    process.env.NODE_ENV === "production" ? "https://chessrun.ru" : "http://localhost:3001";

export const API_ENDPOINTS = {
    auth: {
        login: "/api/auth/login",
        register: "/api/auth/register",
        logout: "/api/auth/logout",
        me: "/api/auth/me",
    },
    news: {
        list: "/api/news",
        create: "/api/news",
        update: (id: number) => `/api/news/${id}`,
        delete: (id: number) => `/api/news/${id}`,
        uploadImages: (id: number) => `/api/news/${id}/images`,
        deleteImage: (imageId: number) => `/api/news/images/${imageId}`,
        reorderImages: (id: number) => `/api/news/${id}/images/reorder`,
        uploadFiles: (id: number) => `/api/news/${id}/files`,
        deleteFile: (fileId: number) => `/api/news/files/${fileId}`,
        categories: "/api/news/categories",
    },
};

// Утилита для создания полного URL
export const createApiUrl = (endpoint: string): string => {
    return `${API_BASE_URL}${endpoint}`;
};
