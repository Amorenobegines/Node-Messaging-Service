import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from "typeorm";

import { Message } from "../../messages/entities/Message";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn() // Puedes recuperar registros eliminados si quieres.
    deletedAt!: Date;

    @OneToMany(() => Message, message => message.sender)
    sentMessages!: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages!: Message[];


}
