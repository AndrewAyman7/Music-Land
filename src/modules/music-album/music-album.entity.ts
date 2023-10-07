import { Album } from "src/commons/classes/abstract-album";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Musician } from "../musician/musician.entity";
import { Music } from "../music/music.entity";

@Entity('music-albums')
export class MusicAlbum extends Album{

    // Relation between albums & Musician
    @ManyToOne(type => Musician , musician => musician.albums) // kza album le 1 musician
    musician:Musician;

    // Relation between album & Musics
    @OneToMany(type => Music , music => music.album) // arbot b anhy table elAwl && b3d ma rabatt b2a 3ayez anhy field
    musics:Music[];

    @Column() // Foreign Key ,, elAlbum da bta3 meen , el Id bta3 sa7bo
    musicianId:number;
}