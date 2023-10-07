import { AbstractMusic } from "src/commons/classes/abstract-music";
import { MusicLanguage } from "src/commons/enums/music.-lang.enum";
import { SongType } from "src/commons/enums/song-type.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { SongAlbum } from "../song-album/song-album.entity";
import { Track } from "../track/track.entity";

@Entity('songs')
export class Song extends AbstractMusic{
    @Column({
        type:'enum',
        enum:SongType
    })
    type:SongType;

    @Column()
    language:MusicLanguage;

    @ManyToOne(type => SongAlbum , album => album.songs) // arbot b anhy table elAwl && b3d ma rabatt b2a 3ayez anhy field
    album:SongAlbum; // yb2a lazem tsmy el FK : album + Id  "albumId"

    @Column()
    albumId:number;

    @OneToMany(type => Track , t => t.song)
    tracks:Track[]
}