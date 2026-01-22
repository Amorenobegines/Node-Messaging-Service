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

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // Usuario que envía el mensaje
    @ManyToOne(() => User, user => user.sentMessages)
    sender!: User;

    @Column('uuid')
    senderId!: string | null;

    @ManyToOne(() => User, user => user.receivedMessages)
    receiver!: User;

    @Column('uuid')
    receiverId!: string | null;


    @Column('text')
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: false })
    isLeido!: boolean;
}
