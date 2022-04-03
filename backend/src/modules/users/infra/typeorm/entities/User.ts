import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Exclude, Expose } from 'class-transformer';

@Entity('users') // nome da tabela
class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({name: 'avatar_url'})
  AvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
      
    switch (process.env.STORAGE_DRIVER) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${process.env.STORAGE_AWS_BUCKET}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
    
  }


}


export default User;
