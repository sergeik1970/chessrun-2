import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig, multerPdfConfig, multerUniversalConfig } from '../../config/multer.config';
import { FilesService } from '../../services/FilesService/files.service';
import { S3Service } from '../../services/S3Service/s3.service';
import { Files } from '../../entities/Files/files.entity';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  create(@Body() createFilesDto: Partial<Files>) {
    return this.filesService.create(createFilesDto);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get('news/:newsId')
  findByNewsId(@Param('newsId', ParseIntPipe) newsId: number) {
    return this.filesService.findByNewsId(newsId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilesDto: Partial<Files>,
  ) {
    return this.filesService.update(id, updateFilesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.remove(id);
  }

  @Get('s3/test')
  async testS3Connection() {
    try {
      // Проверяем, существует ли тестовый файл
      const testKey = 'test-connection.txt';
      const exists = await this.s3Service.fileExists(testKey);
      
      return {
        success: true,
        message: 'S3 подключение работает',
        testFileExists: exists,
        bucketName: process.env.AWS_S3_BUCKET_NAME,
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_S3_ENDPOINT || 'AWS S3 (стандартный)',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка подключения к S3',
        error: error.message,
      };
    }
  }

  @Post('upload/:postId')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadPostImage(
    @Param('postId', ParseIntPipe) postId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        return {
          success: false,
          message: 'Файл не был загружен',
        };
      }

      const result = await this.s3Service.uploadPostImage(file, postId);
      
      return {
        success: true,
        message: 'Изображение успешно загружено',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при загрузке изображения',
        error: error.message,
      };
    }
  }

  @Get('post/:postId/images')
  async getPostImages(@Param('postId', ParseIntPipe) postId: number) {
    try {
      const images = await this.s3Service.getPostImages(postId);
      
      return {
        success: true,
        postId: postId,
        images: images,
        count: images.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при получении изображений поста',
        error: error.message,
      };
    }
  }

  @Delete('post/:postId/images')
  async deletePostImages(@Param('postId', ParseIntPipe) postId: number) {
    try {
      await this.s3Service.deletePostImages(postId);
      
      return {
        success: true,
        message: `Все изображения поста ${postId} удалены`,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при удалении изображений поста',
        error: error.message,
      };
    }
  }

  @Post('upload-pdf/:postId')
  @UseInterceptors(FileInterceptor('pdf', multerPdfConfig))
  async uploadPostPdf(
    @Param('postId', ParseIntPipe) postId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        return {
          success: false,
          message: 'PDF файл не был загружен',
        };
      }

      const result = await this.s3Service.uploadPostPdf(file, postId);
      
      return {
        success: true,
        message: 'PDF файл успешно загружен',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при загрузке PDF файла',
        error: error.message,
      };
    }
  }

  @Get('post/:postId/pdfs')
  async getPostPdfs(@Param('postId', ParseIntPipe) postId: number) {
    try {
      const pdfs = await this.s3Service.getPostPdfs(postId);
      
      return {
        success: true,
        postId: postId,
        pdfs: pdfs,
        count: pdfs.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при получении PDF файлов поста',
        error: error.message,
      };
    }
  }

  @Post('upload-file/:postId')
  @UseInterceptors(FileInterceptor('file', multerUniversalConfig))
  async uploadPostFile(
    @Param('postId', ParseIntPipe) postId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        return {
          success: false,
          message: 'Файл не был загружен',
        };
      }

      const result = await this.s3Service.uploadPostFile(file, postId);
      
      return {
        success: true,
        message: `${result.type === 'pdf' ? 'PDF файл' : 'Изображение'} успешно загружено`,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при загрузке файла',
        error: error.message,
      };
    }
  }

  @Get('post/:postId/files')
  async getPostFiles(@Param('postId', ParseIntPipe) postId: number) {
    try {
      const files = await this.s3Service.getPostFiles(postId);
      
      return {
        success: true,
        postId: postId,
        files: files,
        totalCount: files.all.length,
        imageCount: files.images.length,
        pdfCount: files.pdfs.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при получении файлов поста',
        error: error.message,
      };
    }
  }
}