import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Slider {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    newsId: number;

    @Column()
    url: string;
}
