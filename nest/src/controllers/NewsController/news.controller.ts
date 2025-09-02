import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    UseGuards,
    Request,
    UploadedFiles,
    UseInterceptors,
    Response,
    Put,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { NewsService } from "../../services/NewsService/news.service";
import { News, PostCategory } from "../../entities/News/news.entity";
import { multerConfig, multerUniversalConfig } from "../../config/multer.config";
// import { JwtAuthGuard } from "../AuthModule/jwt-auth.guard";
// import { AdminGuard } from "../AuthModule/admin.guard";

interface CreatePostDto {
    title: string;
    body: string;
    category: PostCategory;
    link?: string;
}

@Controller("news")
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post()
    // @UseGuards(JwtAuthGuard, AdminGuard)
    create(@Body() createNewsDto: CreatePostDto, @Request() req) {
        const newsData: any = {
            ...createNewsDto,
        };
        
        // Добавляем authorId только если пользователь аутентифицирован
        if (req.user?.id) {
            newsData.authorId = req.user.id;
        }
        
        return this.newsService.create(newsData);
    }

    @Get()
    findAll(@Query("category") category?: PostCategory) {
        if (category) {
            return this.newsService.findByCategory(category);
        }
        return this.newsService.findAll();
    }

    @Get("categories")
    getCategories() {
        return this.newsService.getCategories();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.newsService.findOne(id);
    }

    @Patch(":id")
    // @UseGuards(JwtAuthGuard, AdminGuard)
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateNewsDto: Partial<News>,
    ) {
        return this.newsService.update(id, updateNewsDto);
    }

    @Delete(":id")
    // @UseGuards(JwtAuthGuard, AdminGuard)
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.newsService.remove(id);
    }

    @Post(":id/images")
    // @UseGuards(JwtAuthGuard, AdminGuard)
    @UseInterceptors(FilesInterceptor("files"))
    async addImages(
        @Param("id", ParseIntPipe) id: number,
        @UploadedFiles() files: Express.Multer.File[],
        @Body() body: { alt?: string; isMain?: boolean },
    ) {
        console.log(`Received ${files?.length || 0} files for post ${id}`);
        console.log(
            "Files:",
            files?.map((f) => ({
                name: f.originalname,
                size: f.size,
                mimetype: f.mimetype,
            })),
        );

        const results = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(
                `Processing file ${i + 1}/${files.length}: ${file.originalname}`,
            );

            // Передаем buffer напрямую в сервис
            const result = await this.newsService.addImage(
                id,
                file.buffer,
                file.mimetype,
                file.originalname,
                body.alt,
                i === 0, // Первое изображение делаем главным
            );
            results.push(result);
            console.log(`Saved image ${i + 1} with ID:`, result.id);
        }

        console.log(`Successfully saved ${results.length} images`);
        return results;
    }

    @Get(":id/images")
    getPostImages(@Param("id", ParseIntPipe) postId: number) {
        return this.newsService.getPostImages(postId);
    }

    @Get(":id/images/:imageId")
    async getImage(
        @Param("id", ParseIntPipe) postId: number,
        @Param("imageId", ParseIntPipe) imageId: number,
        @Response() res,
    ) {
        const image = await this.newsService.getImage(postId, imageId);

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Если есть S3 URL, перенаправляем на него
        if (image.s3Url) {
            return res.redirect(image.s3Url);
        }

        // Fallback для старых изображений (base64)
        if (image.file) {
            const imageBuffer = Buffer.from(image.file, "base64");
            res.set({
                "Content-Type": image.mimeType || "image/jpeg",
                "Content-Length": imageBuffer.length,
                "Cache-Control": "public, max-age=31536000",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            });
            return res.send(imageBuffer);
        }

        return res.status(404).json({ message: "Image data not found" });
    }

    @Delete("images/:imageId")
    // @UseGuards(JwtAuthGuard, AdminGuard)
    removeImage(@Param("imageId", ParseIntPipe) imageId: number) {
        return this.newsService.removeImage(imageId);
    }

    @Put(":id/images/reorder")
    // @UseGuards(JwtAuthGuard, AdminGuard)
    reorderImages(
        @Param("id", ParseIntPipe) postId: number,
        @Body() body: { imageIds: number[] },
    ) {
        return this.newsService.reorderImages(postId, body.imageIds);
    }

    // Endpoints для файлов
    @Post(":id/files")
    // @UseGuards(JwtAuthGuard, AdminGuard)
    @UseInterceptors(FilesInterceptor("files", 10, multerUniversalConfig))
    async addFiles(
        @Param("id", ParseIntPipe) id: number,
        @UploadedFiles() files: Express.Multer.File[],
        @Body() body: { title?: string; files?: any[] },
    ) {
        console.log('=== addFiles method called ===');
        console.log('Post ID:', id);
        console.log('Files parameter:', files);
        console.log('Files type:', typeof files);
        console.log('Files is array:', Array.isArray(files));
        console.log(`Received ${files?.length || 0} files for post ${id}`);
        console.log('Body:', body);
        
        // Проверяем, есть ли файлы в multipart/form-data
        if (files && files.length > 0) {
            console.log('Processing multipart files');
        }
        // Проверяем, есть ли файлы в JSON body (base64)
        else if (body.files && body.files.length > 0) {
            console.log('Processing JSON base64 files');
            // Конвертируем base64 файлы в формат multer
            files = body.files.map(fileData => {
                const base64Data = fileData.file.split(',')[1]; // Убираем "data:application/pdf;base64,"
                const buffer = Buffer.from(base64Data, 'base64');
                
                return {
                    buffer: buffer,
                    mimetype: fileData.file.split(';')[0].split(':')[1], // Извлекаем mime type
                    originalname: fileData.originalName || 'file.pdf',
                    size: buffer.length
                } as Express.Multer.File;
            });
        }
        else {
            console.log('No files received');
            return [];
        }
        
        const results = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(`Processing file ${i + 1}/${files.length}:`, {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                bufferLength: file.buffer?.length
            });
            
            try {
                // Определяем title для файла
                let fileTitle = file.originalname;
                if (body.files && body.files[i] && body.files[i].title) {
                    fileTitle = body.files[i].title;
                } else if (body.title) {
                    fileTitle = body.title;
                }
                
                const result = await this.newsService.addFile(
                    id,
                    file.buffer,
                    file.mimetype,
                    file.originalname,
                    fileTitle,
                    file.size,
                );
                results.push(result);
                console.log(`Saved file ${i + 1} with ID:`, result.id);
            } catch (error) {
                console.error(`Error processing file ${i + 1}:`, error);
                throw error;
            }
        }

        console.log(`Successfully saved ${results.length} files`);
        return results;
    }

    @Get(":id/files")
    getPostFiles(@Param("id", ParseIntPipe) postId: number) {
        return this.newsService.getPostFiles(postId);
    }

    @Get(":id/files/:fileId")
    async getFile(
        @Param("id", ParseIntPipe) postId: number,
        @Param("fileId", ParseIntPipe) fileId: number,
        @Response() res,
        @Query("download") download?: string,
    ) {
        const file = await this.newsService.getFile(postId, fileId);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Если есть S3 URL, проксируем файл для правильных заголовков
        if (file.s3Url) {
            try {
                const fetch = (await import('node-fetch')).default;
                const response = await fetch(file.s3Url);
                
                if (!response.ok) {
                    return res.status(404).json({ message: "File not found in storage" });
                }

                const fileBuffer = await response.buffer();
                
                // Устанавливаем правильные заголовки для просмотра в браузере
                const disposition = download === 'true' ? 'attachment' : 'inline';
                
                res.set({
                    "Content-Type": file.mimeType || "application/pdf",
                    "Content-Length": fileBuffer.length.toString(),
                    "Content-Disposition": `${disposition}; filename="${file.originalName}"`,
                    "Cache-Control": "public, max-age=31536000",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "Content-Type",
                });

                return res.send(fileBuffer);
            } catch (error) {
                console.error('Error proxying file from S3:', error);
                return res.status(500).json({ message: "Error retrieving file" });
            }
        }

        // Fallback для старых файлов (base64)
        if (file.file) {
            const fileBuffer = Buffer.from(file.file, "base64");
            res.set({
                "Content-Type": file.mimeType || "application/pdf",
                "Content-Length": fileBuffer.length,
                "Content-Disposition": `inline; filename="${file.originalName}"`,
                "Cache-Control": "public, max-age=31536000",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            });
            return res.send(fileBuffer);
        }

        return res.status(404).json({ message: "File data not found" });
    }

    @Delete("files/:fileId")
    // @UseGuards(JwtAuthGuard, AdminGuard)
    removeFile(@Param("fileId", ParseIntPipe) fileId: number) {
        return this.newsService.removeFile(fileId);
    }
}
