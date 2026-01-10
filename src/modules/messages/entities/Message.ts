import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/User';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    content!: string;

    // @ManyToOne(() => User, (user) => user.sentMessages)
    // sender!: User;

    // @ManyToOne(() => User, (user) => user.receivedMessages)
    // receiver!: User;

    @CreateDateColumn()
    createdAt!: Date;
}


