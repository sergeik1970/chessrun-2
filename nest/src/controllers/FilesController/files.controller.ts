import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesService } from '../../services/FilesService/files.service';
import { Files } from '../../entities/Files/files.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

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
}