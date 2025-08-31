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

            // Конвертируем файл в base64
            const base64Data = file.buffer.toString("base64");
            const result = await this.newsService.addImage(
                id,
                base64Data,
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

        // Конвертируем base64 обратно в Buffer
        const imageBuffer = Buffer.from(image.file, "base64");

        // Устанавливаем правильные заголовки
        res.set({
            "Content-Type": image.mimeType || "image/jpeg",
            "Content-Length": imageBuffer.length,
            "Cache-Control": "public, max-age=31536000", // Кэшируем на год
            "Access-Control-Allow-Origin": "*", // Разрешаем CORS для изображений
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
        });

        return res.send(imageBuffer);
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
    async addFiles(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: { files: Array<{ file: string; mimeType: string; originalName: string; title: string; size: number }> },
    ) {
        console.log(`Received ${body.files?.length || 0} files for post ${id}`);
        
        const results = [];
        for (let i = 0; i < body.files.length; i++) {
            const fileData = body.files[i];
            console.log(`Processing file ${i + 1}/${body.files.length}: ${fileData.originalName}`);

            // Извлекаем base64 данные (убираем data:application/pdf;base64, префикс)
            const base64Data = fileData.file.split(',')[1] || fileData.file;
            
            const result = await this.newsService.addFile(
                id,
                base64Data,
                fileData.mimeType,
                fileData.originalName,
                fileData.title,
                fileData.size,
            );
            results.push(result);
            console.log(`Saved file ${i + 1} with ID:`, result.id);
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
    ) {
        const file = await this.newsService.getFile(postId, fileId);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Конвертируем base64 обратно в Buffer
        const fileBuffer = Buffer.from(file.file, "base64");

        // Устанавливаем правильные заголовки для PDF
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

    @Delete("files/:fileId")
    // @UseGuards(JwtAuthGuard, AdminGuard)
    removeFile(@Param("fileId", ParseIntPipe) fileId: number) {
        return this.newsService.removeFile(fileId);
    }
}
