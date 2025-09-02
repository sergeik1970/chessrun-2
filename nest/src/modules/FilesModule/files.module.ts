import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from '../../entities/Files/files.entity';
import { FilesController } from '../../controllers/FilesController/files.controller';
import { FilesService } from '../../services/FilesService/files.service';
import { S3Service } from '../../services/S3Service/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  controllers: [FilesController],
  providers: [FilesService, S3Service],
  exports: [FilesService, S3Service],
})
export class FilesModule {}