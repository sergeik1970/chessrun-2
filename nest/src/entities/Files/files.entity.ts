import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { News } from "../News/news.entity";

@Entity()
export class Files {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    newsId: number;

    @Column("text")
    file: string; // Теперь хранит base64 данные

    @Column({ nullable: true, length: 100 })
    mimeType: string; // MIME тип файла (image/jpeg, image/png, etc.)

    @Column({ nullable: true, length: 255 })
    originalName: string; // Оригинальное имя файла

    @Column({ nullable: true })
    alt: string;

    @Column({ default: false })
    isMain: boolean;

    @ManyToOne(() => News, (news) => news.images, { onDelete: "CASCADE" })
    @JoinColumn({ name: "newsId" })
    news: News;
}
