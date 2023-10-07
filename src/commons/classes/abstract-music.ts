import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class AbstractMusic extends BaseEntity{ // @Entity(')
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string; // klmat elTarnema msln

    @Column()
    artist:string;

    @Column({nullable:true})
    rate:number;

    @Column({ default:new Date() })
    puplishedIn:Date;

    @Column()
    source:string; // el music itself (mp3 file)

    @Column()
    img:string;

}