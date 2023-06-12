/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from './portfolio.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(()=> Portfolio, (portfolio) => portfolio.id)
  @JoinColumn()
  portfolio: Portfolio

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string
}
