import { BaseEntity, Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../playlist/playlist.entity";
import { FavoriteList } from "../fav/favorite.entity";
import { Song } from "../song/song.entity";
import { Music } from "../music/music.entity";

@Entity('tracks')
export class Track extends BaseEntity {
    @PrimaryGeneratedColumn() // PK
    id:number;
    
    @Column()
    title:string;

    @Column()
    link:string; // source - url

    @Generated()
    @Column()
    index:number; // index of track in playlist

    @ManyToOne(type => Playlist , p => p.tracks)
    playlist:Playlist;

    @ManyToOne(type => FavoriteList , f => f.tracks)
    favoriteList:FavoriteList;

    @ManyToOne(type => Song, song => song.tracks)
    song:Song;

    @ManyToOne(type => Music , m => m.tracks)
    music:Music;

    // el 4 foreignKeys ely 3mlthom fo2 3ayz tsmehom eh .. msh mohm tktbhom , hyt3mlo lw7dhom bel esm da asln
    @Column({nullable:true})
    playlistId:number;

    @Column({nullable:true})
    songId:number;

    @Column({nullable:true})
    musicId:number;

    @Column({nullable:true})
    favoriteListId:number;

}