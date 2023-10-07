import { Artist } from "src/commons/classes/abstract-artist";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MusicAlbum } from "../music-album/music-album.entity";
import { Track } from "../track/track.entity";

@Entity('musicians')
export class Musician extends Artist{

    @OneToMany(type => MusicAlbum , album=>album.musician , {eager:true})
    albums:MusicAlbum[];

    // eager:true -> zy populate kda, lma tgeeb elMusician hat m3ah elAlbums
    // bdl lma to3od t3ml fe elService fun elFind -> return this.userRepository.find( {relations:['courses']} );
}