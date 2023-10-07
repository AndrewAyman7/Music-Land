import { DataSource, EntityRepository, Repository } from "typeorm";
import { Song } from "./song.entity";
import { MusicLanguage } from "src/commons/enums/music.-lang.enum";
import { SongType } from "src/commons/enums/song-type.enum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SongRepository extends Repository<Song>{
    constructor( private dataSource:DataSource ){
        super(Song, dataSource.createEntityManager());
    }

    async getLimitedSongs(limit:number) :Promise<Song[]>{
        
        const query = this.createQueryBuilder('song').select();

        if(limit){
            query.limit(limit);
        }
        const songs = await query.leftJoinAndSelect('song.tracks' , 'tracks').getMany();
        return songs;
    }

    async getFilteredSongs(limit:number, type:SongType, language:MusicLanguage , rate:number) :Promise<Song[]> {

        const query = this.createQueryBuilder('song').select();

        if(limit){
            query.limit(limit);
        }
        if(type){
            query.where('song.type LIKE :type' , {type});
        }
        if(language){
            query.where('song.language LIKE :language' , {language});
        }
        if(rate){
            query.andWhere('song.rate = :rate' , {rate}); 
        }

        const songs = await query.leftJoinAndSelect('song.tracks' , 'tracks').getMany();
        return songs;
    }

}