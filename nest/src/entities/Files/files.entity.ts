import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Files {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    newsId: number;

    @Column()
    file: string;
}
