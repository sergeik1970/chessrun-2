import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News, PostCategory } from "../../entities/News/news.entity";
import { Files } from "../../entities/Files/files.entity";
import { S3Service } from "../S3Service/s3.service";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
        @InjectRepository(Files)
        private filesRepository: Repository<Files>,
        private s3Service: S3Service,
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
                    // Приоритет S3 URL, fallback на локальный endpoint
                    url: image.s3Url || `http://localhost:3001/api/news/${post.id}/images/${image.id}`,
                })),
            files: (post.files || []).map((file) => ({
                id: file.id,
                title: file.title,
                originalName: file.originalName,
                mimeType: file.mimeType,
                size: file.size,
                // Приоритет S3 URL, fallback на локальный endpoint для файлов
                url: file.s3Url || `http://localhost:3001/api/news/${post.id}/files/${file.id}`,
                file: file.s3Url ? null : file.file, // base64 данные только если нет S3
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
                    // Приоритет S3 URL, fallback на локальный endpoint
                    url: image.s3Url || `http://localhost:3001/api/news/${post.id}/images/${image.id}`,
                })),
            files: (post.files || []).map((file) => ({
                id: file.id,
                title: file.title,
                originalName: file.originalName,
                mimeType: file.mimeType,
                size: file.size,
                // Приоритет S3 URL, fallback на локальный endpoint для файлов
                url: file.s3Url || `http://localhost:3001/api/news/${post.id}/files/${file.id}`,
                file: file.s3Url ? null : file.file, // base64 данные только если нет S3
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
                    // Приоритет S3 URL, fallback на локальный endpoint
                    url: image.s3Url || `http://localhost:3001/api/news/${post.id}/images/${image.id}`,
                })),
            files: (post.files || []).map((file) => ({
                id: file.id,
                title: file.title,
                originalName: file.originalName,
                mimeType: file.mimeType,
                size: file.size,
                // Приоритет S3 URL, fallback на локальный endpoint для файлов
                url: file.s3Url || `http://localhost:3001/api/news/${post.id}/files/${file.id}`,
                file: file.s3Url ? null : file.file, // base64 данные только если нет S3
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
        // Сначала удаляем файлы из S3
        await this.s3Service.deletePostImages(id);
        
        // Затем удаляем связанные записи в БД
        await this.filesRepository.delete({ newsId: id });
        
        // И наконец удаляем новость
        await this.newsRepository.delete(id);
    }

    async addImage(
        newsId: number,
        fileBuffer: Buffer,
        mimeType: string,
        originalName: string,
        alt?: string,
        isMain?: boolean,
    ): Promise<Files> {
        // Получаем текущее количество изображений для определения порядка
        const existingImagesCount = await this.filesRepository.count({
            where: { newsId, type: 'image' },
        });

        // Создаем объект файла для S3
        const fileObj = {
            buffer: fileBuffer,
            mimetype: mimeType,
            originalname: originalName,
        };

        // Загружаем в S3
        const s3Result = await this.s3Service.uploadPostImage(fileObj, newsId);

        // Сохраняем информацию в БД
        const image = this.filesRepository.create({
            newsId,
            s3Key: s3Result.key,
            s3Url: s3Result.url,
            mimeType,
            originalName,
            alt,
            isMain: isMain || false,
            order: existingImagesCount,
            type: 'image',
        });
        
        return this.filesRepository.save(image);
    }

    async getPostImages(postId: number): Promise<any[]> {
        const images = await this.filesRepository.find({
            where: { newsId: postId, type: 'image' },
            select: ["id", "alt", "isMain", "mimeType", "originalName", "s3Url"],
            order: { order: 'ASC' },
        });

        // Добавляем URL для каждого изображения
        return images.map((image) => ({
            ...image,
            // Приоритет S3 URL, fallback на локальный endpoint
            url: image.s3Url || `http://localhost:3001/api/news/${postId}/images/${image.id}`,
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
        // Получаем информацию о файле перед удалением
        const image = await this.filesRepository.findOne({
            where: { id: imageId },
        });

        if (image && image.s3Key) {
            // Удаляем из S3
            await this.s3Service.deleteFile(image.s3Key);
        }

        // Удаляем из БД
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
        fileBuffer: Buffer,
        mimeType: string,
        originalName: string,
        title: string,
        size: number,
    ): Promise<Files> {
        console.log(`Adding file: ${originalName}, size: ${size}, mimeType: ${mimeType}`);
        
        // Создаем объект файла для S3
        const fileObj = {
            buffer: fileBuffer,
            mimetype: mimeType,
            originalname: originalName,
        };

        console.log('Uploading to S3...');
        // Загружаем в S3 (используем универсальный метод)
        const s3Result = await this.s3Service.uploadPostFile(fileObj, newsId);
        console.log('S3 upload result:', s3Result);

        // Сохраняем информацию в БД
        const file = this.filesRepository.create({
            newsId,
            s3Key: s3Result.key,
            s3Url: s3Result.url,
            mimeType,
            originalName,
            title,
            size,
            type: s3Result.type === 'pdf' ? 'file' : 'image', // Используем тип из S3Service
        });

        const savedFile = await this.filesRepository.save(file);
        console.log('File saved to DB with ID:', savedFile.id);
        
        return savedFile;
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
        // Получаем информацию о файле перед удалением
        const file = await this.filesRepository.findOne({
            where: { id: fileId },
        });

        if (file && file.s3Key) {
            // Удаляем из S3
            await this.s3Service.deleteFile(file.s3Key);
        }

        // Удаляем из БД
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
