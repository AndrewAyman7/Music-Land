import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../enums/gender.enum";
import { ArtistType } from "../enums/artist-type.enum";

export abstract class Artist extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    info:string;

    @Column()
    image:string;

    @Column()
    nationality:string;
    
    @Column({
        type:'enum',
        enum:ArtistType,
        array:false
    })
    type:ArtistType;

    @Column({
        type:'enum',
        enum:Gender,
        array:false,
        nullable:true // 3shan lw Band
    })
    gender:Gender;
}