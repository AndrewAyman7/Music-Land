import { DataSource, EntityRepository, Repository } from "typeorm";
import { Music } from "./music.entity";
import { MusicType } from "src/commons/enums/music-type.enum";
import { Injectable } from "@nestjs/common";

// Provider
// @EntityRepository(Music) // Deprecated
@Injectable()
export class MusicRepository extends Repository<Music>{
    constructor(private dataSource:DataSource){
        super(Music , dataSource.createEntityManager())
    }

    async getLimitedMusics(limit:number) :Promise<Music[]>{
        
        const query = this.createQueryBuilder('music').select();

        if(limit){
            query.limit(limit);
        }
        const musics = await query.leftJoinAndSelect('music.tracks' , 'tracks').getMany();
        return musics;
    }

    async getFilteredMusics(limit:number, type:MusicType , rate:number) :Promise<Music[]> {

        const query = this.createQueryBuilder('music').select();

        // filter first , then get

        if(limit){
            query.limit(limit);
        }
        if(type){
            query.where('music.type LIKE :type' , {type});
        }
        if(rate){
            query.andWhere('music.rate = :rate' , {rate}); 
        }

        const musics = await query.leftJoinAndSelect('music.tracks' , 'tracks').getMany();
        return musics;
    }

}


