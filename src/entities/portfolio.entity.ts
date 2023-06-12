/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from './image.entity';
import { User } from './user.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(()=> User, (user) => user.id)
  @JoinColumn()
  user: number

  @Column()
  desctiption: string

  @OneToMany(()=> Image, (image) => image.id, {onDelete: 'CASCADE'})
  images: Image

  @CreateDateColumn()
  createdAt: Date
}
