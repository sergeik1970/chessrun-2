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
            relations: ["author", "images"],
            order: { createdAt: "DESC" },
        });

        // Добавляем URL для изображений
        return posts.map((post) => ({
            ...post,
            images: post.images.map((image) => ({
                id: image.id,
                alt: image.alt,
                isMain: image.isMain,
                mimeType: image.mimeType,
                originalName: image.originalName,
                url: `http://localhost:3001/api/news/${post.id}/images/${image.id}?t=${Date.now()}`,
            })),
        }));
    }

    async findOne(id: number): Promise<any> {
        const post = await this.newsRepository.findOne({
            where: { id },
            relations: ["author", "images"],
        });

        if (!post) return null;

        // Добавляем URL для изображений
        return {
            ...post,
            images: post.images.map((image) => ({
                id: image.id,
                alt: image.alt,
                isMain: image.isMain,
                mimeType: image.mimeType,
                originalName: image.originalName,
                url: `http://localhost:3001/api/news/${post.id}/images/${image.id}?t=${Date.now()}`,
            })),
        };
    }

    async findByCategory(category: PostCategory): Promise<any[]> {
        const posts = await this.newsRepository.find({
            where: { category },
            relations: ["author", "images"],
            order: { createdAt: "DESC" },
        });

        // Добавляем URL для изображений
        return posts.map((post) => ({
            ...post,
            images: post.images.map((image) => ({
                id: image.id,
                alt: image.alt,
                isMain: image.isMain,
                mimeType: image.mimeType,
                originalName: image.originalName,
                url: `http://localhost:3001/api/news/${post.id}/images/${image.id}?t=${Date.now()}`,
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
        const image = this.filesRepository.create({
            newsId,
            file: base64Data,
            mimeType,
            originalName,
            alt,
            isMain: isMain || false,
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
        ];
    }
}
