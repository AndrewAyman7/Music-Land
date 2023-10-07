import { Artist } from "src/commons/classes/abstract-artist";
import { Entity, OneToMany } from "typeorm";
import { SongAlbum } from "../song-album/song-album.entity";

@Entity('singers')
export class Singer extends Artist{

    @OneToMany(type => SongAlbum , album => album.singer , {eager:true})  
    albums:SongAlbum[];
}