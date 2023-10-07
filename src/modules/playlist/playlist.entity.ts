import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../auth/entities/user.entity";
import { Track } from "../track/track.entity";

@Entity('playlists')
export class Playlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({default:new Date()})
    createdAt:Date;

    @ManyToOne(type => UserEntity , user => user.playlists) // Many Playlists to 1 user
    user:UserEntity;

    @Column() // foreignKey ,, lma b3ml elManyToOne m3 eluser, hy3ml FK lw7do , 5azno hena b2a , hy3mlo ByDef asln
    userId:number;

    @OneToMany(type=>Track , t=>t.playlist , {eager:true} )
    tracks:Track[];
}