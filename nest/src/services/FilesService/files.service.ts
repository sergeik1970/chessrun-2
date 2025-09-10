import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Files } from "../../entities/Files/files.entity";

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(Files)
        private filesRepository: Repository<Files>,
    ) {}

    async findAll(): Promise<Files[]> {
        return this.filesRepository.find();
    }

    async findByNewsId(newsId: number): Promise<Files[]> {
        return this.filesRepository.find({
            where: { newsId },
        });
    }

    async findOne(id: number): Promise<Files> {
        return this.filesRepository.findOne({
            where: { id },
        });
    }

    async create(filesData: Partial<Files>): Promise<Files> {
        const files = this.filesRepository.create(filesData);
        return this.filesRepository.save(files);
    }

    async update(id: number, filesData: Partial<Files>): Promise<Files> {
        await this.filesRepository.update(id, filesData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.filesRepository.delete(id);
    }
}
