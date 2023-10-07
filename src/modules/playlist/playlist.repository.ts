import { DataSource, EntityRepository, Repository } from "typeorm";
import { Playlist } from "./playlist.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlayListRepositpry extends Repository<Playlist>{

    constructor( private dataSource:DataSource ){
        super(Playlist, dataSource.createEntityManager());
    }

    async getUserPlaylists(userId:number) : Promise<Playlist[]>{
        const query = this.createQueryBuilder('playlist').select();

        if(userId){
            query.where('playlist.userId = :userId' , {userId});
            const playlists = await query.leftJoinAndSelect('playlist.tracks' , 'tracks').getMany();
            return playlists;
        }else{
            return [];
        }
    }
}