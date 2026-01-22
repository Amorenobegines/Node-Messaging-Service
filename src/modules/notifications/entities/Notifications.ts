import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { Message } from "../../messages/entities/Message";
import { User } from "../../users/entities/User";


@Entity('notification')
export class Notifications {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // FK: senderId
    @Column('uuid')
    senderId!: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'senderId' })
    sender!: User;

    // FK: receiverId
    @Column('uuid')
    receiverId!: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'receiverId' })
    receiver!: User;


    //message id
    @Column('uuid')
    messageId!: string;

    @ManyToOne(() => Message, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'messageId' })
    message!: Message;


    @Column('text')
    type!: string;

    @Column('text')
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: false })
    isLeido!: boolean;
}