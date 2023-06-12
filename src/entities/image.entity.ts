/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  file: string

  @ManyToOne(()=> Portfolio, (portfolio) => portfolio.id)
  @JoinColumn()
  portfolio: Portfolio

  @Column()
  description: string

  @Column()
  comments: string

  @CreateDateColumn()
  createdAt: Date
}