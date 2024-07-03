import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('books')
export class Book extends BaseEntity{
@PrimaryGeneratedColumn()
id!: number

@Column({name: 'title'})
title!: string

@Column({name: 'description'})
description!: string

@Column({name: 'author_id'})
authorId!: number

}
