import { ObjectId } from 'mongodb';
import {Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn} from 'typeorm'


@Entity("notifications")
 class Notification{


    @ObjectIdColumn()
    id: ObjectId; // ObjectID é uma classe do TypeORM que representa um id do banco de dados, padrao do mongoDB

    @Column()
    content: string; // conteudo da notificação

    @Column('uuid')
    recipient_id: string; // id do usuario que receberá a notificação

    @Column({default: false})
    read: boolean; // se a notificação foi lida ou não

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}

export default Notification