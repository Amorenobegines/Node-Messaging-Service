import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn
} from "typeorm";
import { User } from "../../users/entities/User";

@Entity()
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    // Usuario que envía el mensaje
    @ManyToOne(() => User, user => user.sentMessages, { onDelete: "CASCADE" })
    sender!: User;

    @Column("uuid")
    senderId!: string;

    // Usuario que recibe el mensaje
    @ManyToOne(() => User, user => user.receivedMessages, { onDelete: "CASCADE" })
    receiver!: User;

    @Column("uuid")
    receiverId!: string;

    @Column("text")
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: false })
    isLeido!: boolean;
}
