import { Album } from "src/commons/classes/abstract-album";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Singer } from "../singer/singer.entity";
import { Song } from "../song/song.entity";

@Entity('song-albums')
export class SongAlbum extends Album{

    // Relation between albums & singer
    @ManyToOne(type => Singer , singer => singer.albums) // arbot b anhy table elAwl && b3d ma rabatt b2a 3ayez anhy field
    singer:Singer; // hab3t elSingerId lel controller, w gwa function el addAlbum, hgeeb elSinger nfso mn elDB , w a7oto fe el singer
    
    // Relation between album & Songs
    @OneToMany(type => Song , song => song.album)
    songs:Song[];

    
    @Column()  // Foreign Key ,, elAlbum da bta3 meen , el Id bta3 sa7bo
    singerId:number; // hayegy lw7do mn elRelation ely fo2 -> singer:Singer ,, hya5od hwa singer w yzwd 3leha Id -> singerId 
    // msh lazem tktbha, btt3ml lw7dha
}