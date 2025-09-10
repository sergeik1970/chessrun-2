import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
    private s3: AWS.S3;
    private bucketName: string;

    constructor() {
        const s3Config: AWS.S3.ClientConfiguration = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION || "us-east-1",
        };

        // Если указан кастомный endpoint (например, для reg.ru или других S3-совместимых сервисов)
        if (process.env.AWS_S3_ENDPOINT) {
            s3Config.endpoint = process.env.AWS_S3_ENDPOINT;
            s3Config.s3ForcePathStyle = true; // Необходимо для кастомных endpoint
        }

        this.s3 = new AWS.S3(s3Config);
        this.bucketName = process.env.AWS_S3_BUCKET_NAME || "catalog-uploads";
    }

    async uploadFile(
        file: any,
        key: string,
    ): Promise<AWS.S3.ManagedUpload.SendData> {
        console.log(`Uploading file to S3:`, {
            bucket: this.bucketName,
            key: key,
            contentType: file.mimetype,
            bufferSize: file.buffer?.length,
            endpoint: process.env.AWS_S3_ENDPOINT,
        });

        const params = {
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
        };

        try {
            const result = await this.s3.upload(params).promise();
            console.log("S3 upload successful:", {
                location: result.Location,
                etag: result.ETag,
                key: result.Key,
            });
            return result;
        } catch (error) {
            console.error("S3 upload failed:", error);
            throw error;
        }
    }

    async deleteFile(key: string): Promise<void> {
        const params = {
            Bucket: this.bucketName,
            Key: key,
        };

        await this.s3.deleteObject(params).promise();
    }

    getFileUrl(key: string): string {
        if (process.env.AWS_S3_ENDPOINT) {
            // Для кастомных endpoint (например, reg.ru)
            const endpoint = process.env.AWS_S3_ENDPOINT.replace(
                /^https?:\/\//,
                "",
            );
            return `https://${endpoint}/${this.bucketName}/${key}`;
        } else {
            // Для стандартного AWS S3
            return `https://${this.bucketName}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`;
        }
    }

    async fileExists(key: string): Promise<boolean> {
        try {
            await this.s3
                .headObject({
                    Bucket: this.bucketName,
                    Key: key,
                })
                .promise();
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Загружает изображение для поста в структуру chessrun/{postId}/
     */
    async uploadPostImage(
        file: any,
        postId: number,
        fileName?: string,
    ): Promise<{ url: string; key: string }> {
        // Генерируем уникальное имя файла если не передано
        const timestamp = Date.now();
        const extension = file.originalname.split(".").pop();
        const finalFileName = fileName || `image_${timestamp}.${extension}`;

        // Создаем ключ в формате chessrun/{postId}/{fileName}
        const key = `chessrun/${postId}/${finalFileName}`;

        const uploadResult = await this.uploadFile(file, key);

        return {
            url: this.getFileUrl(key),
            key: key,
        };
    }

    /**
     * Удаляет все изображения поста
     */
    async deletePostImages(postId: number): Promise<void> {
        const prefix = `chessrun/${postId}/`;

        // Получаем список всех файлов в папке поста
        const listParams = {
            Bucket: this.bucketName,
            Prefix: prefix,
        };

        const listedObjects = await this.s3.listObjectsV2(listParams).promise();

        if (listedObjects.Contents && listedObjects.Contents.length > 0) {
            const deleteParams = {
                Bucket: this.bucketName,
                Delete: {
                    Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
                },
            };

            await this.s3.deleteObjects(deleteParams).promise();
        }
    }

    /**
     * Получает список всех изображений поста
     */
    async getPostImages(postId: number): Promise<string[]> {
        const prefix = `chessrun/${postId}/`;

        const listParams = {
            Bucket: this.bucketName,
            Prefix: prefix,
        };

        const listedObjects = await this.s3.listObjectsV2(listParams).promise();

        if (listedObjects.Contents && listedObjects.Contents.length > 0) {
            // Фильтруем только изображения
            const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
            return listedObjects.Contents.filter((obj) => {
                const key = obj.Key!.toLowerCase();
                return imageExtensions.some((ext) => key.endsWith(ext));
            }).map((obj) => this.getFileUrl(obj.Key!));
        }

        return [];
    }

    /**
     * Загружает PDF файл для поста в структуру chessrun/{postId}/
     */
    async uploadPostPdf(
        file: any,
        postId: number,
        fileName?: string,
    ): Promise<{ url: string; key: string }> {
        console.log(`Uploading PDF for post ${postId}:`, {
            originalname: file.originalname,
            mimetype: file.mimetype,
            bufferSize: file.buffer?.length,
        });

        // Генерируем уникальное имя файла если не передано
        const timestamp = Date.now();
        const finalFileName = fileName || `document_${timestamp}.pdf`;

        // Создаем ключ в формате chessrun/{postId}/{fileName}
        const key = `chessrun/${postId}/${finalFileName}`;

        console.log(`Uploading to S3 with key: ${key}`);

        const uploadResult = await this.uploadFile(file, key);

        const result = {
            url: this.getFileUrl(key),
            key: key,
        };

        console.log("PDF upload completed:", result);

        return result;
    }

    /**
     * Получает список всех PDF файлов поста
     */
    async getPostPdfs(postId: number): Promise<string[]> {
        const prefix = `chessrun/${postId}/`;

        const listParams = {
            Bucket: this.bucketName,
            Prefix: prefix,
        };

        const listedObjects = await this.s3.listObjectsV2(listParams).promise();

        if (listedObjects.Contents && listedObjects.Contents.length > 0) {
            // Фильтруем только PDF файлы
            return listedObjects.Contents.filter((obj) =>
                obj.Key!.toLowerCase().endsWith(".pdf"),
            ).map((obj) => this.getFileUrl(obj.Key!));
        }

        return [];
    }

    /**
     * Загружает любой файл (изображение или PDF) для поста
     */
    async uploadPostFile(
        file: any,
        postId: number,
        fileName?: string,
    ): Promise<{ url: string; key: string; type: "image" | "pdf" }> {
        const timestamp = Date.now();
        const extension = file.originalname.split(".").pop();

        let finalFileName: string;
        let fileType: "image" | "pdf";

        if (file.mimetype === "application/pdf") {
            finalFileName = fileName || `document_${timestamp}.pdf`;
            fileType = "pdf";
        } else {
            finalFileName = fileName || `image_${timestamp}.${extension}`;
            fileType = "image";
        }

        const key = `chessrun/${postId}/${finalFileName}`;
        const uploadResult = await this.uploadFile(file, key);

        return {
            url: this.getFileUrl(key),
            key: key,
            type: fileType,
        };
    }

    /**
     * Получает все файлы поста (изображения и PDF) с разделением по типам
     */
    async getPostFiles(postId: number): Promise<{
        images: string[];
        pdfs: string[];
        all: Array<{ url: string; type: "image" | "pdf"; fileName: string }>;
    }> {
        const prefix = `chessrun/${postId}/`;

        const listParams = {
            Bucket: this.bucketName,
            Prefix: prefix,
        };

        const listedObjects = await this.s3.listObjectsV2(listParams).promise();

        const result = {
            images: [] as string[],
            pdfs: [] as string[],
            all: [] as Array<{
                url: string;
                type: "image" | "pdf";
                fileName: string;
            }>,
        };

        if (listedObjects.Contents && listedObjects.Contents.length > 0) {
            const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

            listedObjects.Contents.forEach((obj) => {
                const key = obj.Key!;
                const url = this.getFileUrl(key);
                const fileName = key.split("/").pop() || "";
                const keyLower = key.toLowerCase();

                if (keyLower.endsWith(".pdf")) {
                    result.pdfs.push(url);
                    result.all.push({ url, type: "pdf", fileName });
                } else if (
                    imageExtensions.some((ext) => keyLower.endsWith(ext))
                ) {
                    result.images.push(url);
                    result.all.push({ url, type: "image", fileName });
                }
            });
        }

        return result;
    }
}
