import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News, PostCategory } from "../../entities/News/news.entity";
import { Files } from "../../entities/Files/files.entity";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
        @InjectRepository(Files)
        private filesRepository: Repository<Files>,
    ) {}

    async findAll(): Promise<any[]> {
        const posts = await this.newsRepository.find({
            relations: ["author"],
            order: { createdAt: "DESC" },
        });

        // Загружаем изображения и файлы отдельно
        for (const post of posts) {
            post.images = await this.filesRepository.find({
                where: { newsId: post.id, type: 'image' },
                order: { order: 'ASC' },
            });
            post.files = await this.filesRepository.find({
                where: { newsId: post.id, type: 'file' },
                order: { id: 'ASC' },
            });
        }

        // Добавляем URL для изображений и файлов, сортируем по порядку
        return posts.map((post) => ({
            ...post,
            images: post.images
                .sort((a, b) => a.order - b.order)
                .map((image) => ({
                    id: image.id,
                    alt: image.alt,
                    isMain: image.isMain,
                    mimeType: image.mimeType,
                    originalName: image.originalName,
                    url: `http://localhost:3001/api/news/${post.id}/images/${image.id}?t=${Date.now()}`,
                })),
            files: (post.files || []).map((file) => ({
                id: file.id,
                title: file.title,
                originalName: file.originalName,
                mimeType: file.mimeType,
                size: file.size,
                file: file.file, // base64 данные для фронтенда
            })),
        }));
    }

    async findOne(id: number): Promise<any> {
        const post = await this.newsRepository.findOne({
            where: { id },
            relations: ["author"],
        });

        if (!post) return null;

        // Загружаем изображения и файлы отдельно
        post.images = await this.filesRepository.find({
            where: { newsId: post.id, type: 'image' },
            order: { order: 'ASC' },
        });
        post.files = await this.filesRepository.find({
            where: { newsId: post.id, type: 'file' },
            order: { id: 'ASC' },
        });

        // Добавляем URL для изображений и файлов, сортируем по порядку
        return {
            ...post,
            images: post.images
                .sort((a, b) => a.order - b.order)
                .map((image) => ({
                    id: image.id,
                    alt: image.alt,
                    isMain: image.isMain,
                    mimeType: image.mimeType,
                    originalName: image.originalName,
                    url: `http://localhost:3001/api/news/${post.id}/images/${image.id}?t=${Date.now()}`,
                })),
            files: (post.files || []).map((file) => ({
                id: file.id,
                title: file.title,
                originalName: file.originalName,
                mimeType: file.mimeType,
                size: file.size,
                file: file.file, // base64 данные для фронтенда
            })),
        };
    }

    async findByCategory(category: PostCategory): Promise<any[]> {
        const posts = await this.newsRepository.find({
            where: { category },
            relations: ["author"],
            order: { createdAt: "DESC" },
        });

        // Загружаем изображения и файлы отдельно
        for (const post of posts) {
            post.images = await this.filesRepository.find({
                where: { newsId: post.id, type: 'image' },
                order: { order: 'ASC' },
            });
            post.files = await this.filesRepository.find({
                where: { newsId: post.id, type: 'file' },
                order: { id: 'ASC' },
            });
        }

        // Добавляем URL для изображений и файлов, сортируем по порядку
        return posts.map((post) => ({
            ...post,
            images: post.images
                .sort((a, b) => a.order - b.order)
                .map((image) => ({
                    id: image.id,
                    alt: image.alt,
                    isMain: image.isMain,
                    mimeType: image.mimeType,
                    originalName: image.originalName,
                    url: `http://localhost:3001/api/news/${post.id}/images/${image.id}?t=${Date.now()}`,
                })),
            files: (post.files || []).map((file) => ({
                id: file.id,
                title: file.title,
                originalName: file.originalName,
                mimeType: file.mimeType,
                size: file.size,
                file: file.file, // base64 данные для фронтенда
            })),
        }));
    }

    async create(newsData: Partial<News>): Promise<News> {
        const news = this.newsRepository.create(newsData);
        return this.newsRepository.save(news);
    }

    async update(id: number, newsData: Partial<News>): Promise<News> {
        await this.newsRepository.update(id, newsData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        // Сначала удаляем связанные файлы
        await this.filesRepository.delete({ newsId: id });
        // Затем удаляем новость
        await this.newsRepository.delete(id);
    }

    async addImage(
        newsId: number,
        base64Data: string,
        mimeType: string,
        originalName: string,
        alt?: string,
        isMain?: boolean,
    ): Promise<Files> {
        // Получаем текущее количество изображений для определения порядка
        const existingImagesCount = await this.filesRepository.count({
            where: { newsId },
        });

        const image = this.filesRepository.create({
            newsId,
            file: base64Data,
            mimeType,
            originalName,
            alt,
            isMain: isMain || false,
            order: existingImagesCount, // Новое изображение добавляется в конец
        });
        return this.filesRepository.save(image);
    }

    async getPostImages(postId: number): Promise<any[]> {
        const images = await this.filesRepository.find({
            where: { newsId: postId },
            select: ["id", "alt", "isMain", "mimeType", "originalName"], // Не возвращаем base64 данные
        });

        // Добавляем URL для каждого изображения
        return images.map((image) => ({
            ...image,
            url: `http://localhost:3001/api/news/${postId}/images/${image.id}?t=${Date.now()}`,
        }));
    }

    async getImage(postId: number, imageId: number): Promise<Files | null> {
        return this.filesRepository.findOne({
            where: {
                id: imageId,
                newsId: postId,
            },
        });
    }

    async removeImage(imageId: number): Promise<void> {
        await this.filesRepository.delete(imageId);
    }

    async reorderImages(postId: number, imageIds: number[]): Promise<void> {
        // Получаем все изображения поста
        const images = await this.filesRepository.find({
            where: { newsId: postId },
        });

        // Проверяем, что все переданные ID принадлежат этому посту
        const validImageIds = images.map(img => img.id);
        const invalidIds = imageIds.filter(id => !validImageIds.includes(id));
        
        if (invalidIds.length > 0) {
            throw new Error(`Invalid image IDs: ${invalidIds.join(', ')}`);
        }

        // Сначала сбрасываем isMain для всех изображений
        await this.filesRepository.update(
            { newsId: postId },
            { isMain: false }
        );

        // Обновляем порядок и isMain флаг
        for (let i = 0; i < imageIds.length; i++) {
            const imageId = imageIds[i];
            await this.filesRepository.update(imageId, {
                isMain: i === 0, // Первое изображение становится главным
                order: i, // Устанавливаем новый порядок
            });
        }
    }

    // Методы для работы с файлами
    async addFile(
        newsId: number,
        fileData: string,
        mimeType: string,
        originalName: string,
        title: string,
        size: number,
    ): Promise<Files> {
        const file = this.filesRepository.create({
            newsId,
            file: fileData,
            mimeType,
            originalName,
            title,
            size,
            type: 'file', // Указываем тип как файл
        });

        return this.filesRepository.save(file);
    }

    async getPostFiles(postId: number): Promise<Files[]> {
        return this.filesRepository.find({
            where: { newsId: postId, type: 'file' },
            order: { id: 'ASC' },
        });
    }

    async getFile(postId: number, fileId: number): Promise<Files | null> {
        return this.filesRepository.findOne({
            where: { id: fileId, newsId: postId, type: 'file' },
        });
    }

    async removeFile(fileId: number): Promise<void> {
        await this.filesRepository.delete(fileId);
    }

    getCategories() {
        return [
            {
                id: PostCategory.TRAVEL,
                name: "Путешествия",
                icon: "🏔️",
                color: "#4CAF50",
            },
            {
                id: PostCategory.COMPETITION,
                name: "Соревнования",
                icon: "🏆",
                color: "#FF9800",
            },
            {
                id: PostCategory.TRAINING,
                name: "Тренировки",
                icon: "💪",
                color: "#2196F3",
            },
            {
                id: PostCategory.NEWS,
                name: "Новости",
                icon: "📰",
                color: "#6f42c1",
            },
            {
                id: PostCategory.EVENTS,
                name: "События",
                icon: "🎉",
                color: "#28a745",
            },
        ];
    }
}
