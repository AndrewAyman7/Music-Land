import { AbstractMusic } from "src/commons/classes/abstract-music";
import { MusicType } from "src/commons/enums/music-type.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MusicAlbum } from "../music-album/music-album.entity";
import { Track } from "../track/track.entity";

@Entity('musics')
export class Music extends AbstractMusic{
    @Column({
        type:'enum',
        enum:MusicType
    })
    type:MusicType;

    @ManyToOne(type => MusicAlbum , album => album.musics) // arbot b anhy table elAwl && b3d ma rabatt b2a 3ayez anhy field
    album:MusicAlbum; // yb2a lazem tsmy el FK : album + Id  "albumId"

    // FK
    @Column()
    albumId:number;

    @OneToMany(type => Track , t => t.music)  
    tracks: Track[];
}