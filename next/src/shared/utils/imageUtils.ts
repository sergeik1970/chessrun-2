import { API_BASE_URL } from "../config/api";
import { ImageProcessingOptions, ProcessedImage } from "../types/utils";

/**
 * Получает URL изображения по ID поста и изображения
 * @param postId - ID поста
 * @param imageId - ID изображения
 * @returns URL изображения
 */
export const getImageUrl = (postId: string, imageId: string): string => {
    return `${API_BASE_URL}/api/news/${postId}/images/${imageId}`;
};

/**
 * Получает URL изображения из объекта поста
 * @param postId - ID поста
 * @param image - объект изображения с ID
 * @returns URL изображения
 */
export const getImageUrlFromPost = (postId: string, image: { id: string }): string => {
    return getImageUrl(postId, image.id);
};

/**
 * Конвертирует файл изображения в base64
 * @param file - файл изображения
 * @returns Promise с base64 строкой
 */
export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

/**
 * Обрабатывает изображение с заданными опциями
 * @param file - файл изображения
 * @param options - опции обработки
 * @returns Promise с обработанным изображением
 */
export const processImage = async (
    file: File,
    options: ImageProcessingOptions = {},
): Promise<ProcessedImage> => {
    const { maxWidth = 1920, maxHeight = 1080, quality = 0.8, format = "jpeg" } = options;

    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // Вычисляем новые размеры с сохранением пропорций
            let { width, height } = img;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            // Рисуем изображение на canvas
            ctx?.drawImage(img, 0, 0, width, height);

            // Конвертируем в base64
            const base64 = canvas.toDataURL(`image/${format}`, quality);

            resolve({
                file: base64,
                width,
                height,
                size: base64.length,
                mimeType: `image/${format}`,
            });
        };

        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
};
