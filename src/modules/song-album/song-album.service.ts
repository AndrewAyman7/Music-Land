import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SongAlbum } from "./song-album.entity";
import { DeleteResult, Repository } from "typeorm";
import { SongType } from "src/commons/enums/song-type.enum";
import { MusicLanguage } from "src/commons/enums/music.-lang.enum";
import { Song } from "../song/song.entity";
import { CreateNewMusicianAlbumDTO } from "src/commons/dtos/createMusicianAlbum.dto";

@Injectable()
export class SongAlbumService{
    constructor(@InjectRepository(SongAlbum) private songAlbumRepository:Repository<SongAlbum>){ }

    async getAllSongAlbums():Promise<SongAlbum[]>{
        return this.songAlbumRepository.find();
    }

    async getSongAlbumById(id:number) :Promise<SongAlbum>{
        const album = this.songAlbumRepository.findOneBy({id:id});
        if(album){
            return album;
        }else{
            throw new NotFoundException('album not found')
        }
    }

    async createNewSong(albumId:number, name:string, description:string, artist:string, type:SongType, language:MusicLanguage, source:any) :
    Promise<Song>{
        const album = await this.getSongAlbumById(albumId);

        const song = new Song();
        song.name = name;
        song.description = description;
        song.artist = artist;
        song.type = type;
        song.language = language;
        song.img = album.image;
        song.source = source; // source.
        song.album = album; //->fe Relation hena, fa de m3naha enk btrbot el album da bel song de (m3naha roo7 lel album da w erboto bel song de)
                            // hena b7ot el song de fe elAlbum da ,,  erg3 lel projectNotes file 3shan tfhm aktr
        const savedSong = await song.save();
        return savedSong;
    }

    async updateAlbum(id:number, data:CreateNewMusicianAlbumDTO):Promise<SongAlbum>{
        const album = await this.getSongAlbumById(id);
        let {name} = data;
        if(name){
            album.name = name;
        }
        const updatedAlbum = await album.save();
        return updatedAlbum;
    }

    async deleteAlbum(id:number) :Promise<DeleteResult>{
        let album = await this.getSongAlbumById(id);
        const deletedRes = await this.songAlbumRepository.delete(id);
        if(deletedRes.affected ===0){
            throw new NotFoundException('album not found');
        }
        return deletedRes;
    }


}