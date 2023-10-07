import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Album extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    image:string;
}