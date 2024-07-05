import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book"

@Entity('authors')
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({name: 'name'})
  name!: string

  @Column({name: 'nationality'})
  nationality!: string

  @OneToMany(()=> Book, book => book.author)
  books!: Book[]
}