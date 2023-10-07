import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateNewMusicianAlbumDTO } from "src/commons/dtos/createMusicianAlbum.dto";
import { MusicAlbum } from "./music-album.entity";
import { Music } from "../music/music.entity";
import { MusicType } from "src/commons/enums/music-type.enum";

@Injectable()
export class MusicAlbumService{
    constructor(@InjectRepository(MusicAlbum) private musicAlbumRepository:Repository<MusicAlbum>){ }

    async getAllMusicAlbums():Promise<MusicAlbum[]>{
        return this.musicAlbumRepository.find();
    }

    async getMusicAlbumById(id:number) :Promise<MusicAlbum>{
        const album = this.musicAlbumRepository.findOneBy({id:id});
        if(album){
            return album;
        }else{
            throw new NotFoundException('album not found')
        }
    }

    async createNewMusic(albumId:number, name:string, description:string, artist:string, type:MusicType, source:any) :
    Promise<Music>{
        const album = await this.getMusicAlbumById(albumId);

        const music = new Music();
        music.name = name;
        music.description = description;
        music.artist = artist;
        music.type = type;
        music.img = album.image;
        music.source = source;
        music.album = album; //->fe Relation hena, fa de m3naha enk btrbot el album da bel Music de (m3naha roo7 lel album da w erboto bel Music de)
                            // hena b7ot el Music de fe elAlbum da ,,  erg3 lel projectNotes file 3shan tfhm aktr
        const savedMusic = await music.save();
        return savedMusic;
    }

    async updateAlbum(id:number, data:CreateNewMusicianAlbumDTO):Promise<MusicAlbum>{
        const album = await this.getMusicAlbumById(id);
        let {name} = data;
        if(name){
            album.name = name;
        }
        const updatedAlbum = await album.save();
        return updatedAlbum;
    }

    async deleteAlbum(id:number) :Promise<DeleteResult>{
        let album = await this.getMusicAlbumById(id);
        const deletedRes = await this.musicAlbumRepository.delete(id);
        if(deletedRes.affected ===0){
            throw new NotFoundException('album not found');
        }
        return deletedRes;
    }


}