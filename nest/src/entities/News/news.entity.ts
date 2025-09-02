import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { User } from "../User/user.entity";
import { Files } from "../Files/files.entity";

export enum PostCategory {
    TRAVEL = "travel",
    COMPETITION = "competition",
    TRAINING = "training",
    NEWS = "news",
    EVENTS = "events",
}

@Entity()
export class News {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    link: string;

    @Column("text")
    text: string;

    @Column({
        type: "enum",
        enum: PostCategory,
        default: PostCategory.TRAINING,
    })
    category: PostCategory;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "authorId" })
    author: User;

    @Column({ nullable: true })
    authorId: number;

    @OneToMany(() => Files, (file) => file.news, { 
        createForeignKeyConstraints: false 
    })
    images: Files[];

    @OneToMany(() => Files, (file) => file.news, { 
        createForeignKeyConstraints: false 
    })
    files: Files[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}
