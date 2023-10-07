import { DataSource, EntityRepository, Repository } from "typeorm";
import { Singer } from "./singer.entity";
import { ArtistType } from "src/commons/enums/artist-type.enum";
import { Gender } from "src/commons/enums/gender.enum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SingerRepository extends Repository<Singer>{

    constructor(private dataSource:DataSource){
        super(Singer, dataSource.createEntityManager()); 
    }

    // Note: find() w findById() w Save() wkdaa , btt3ml mn elService Directly , msh mstahla providers

    // (1)
    async getLimitedSingers(limit:number) :Promise<Singer[]>{

        const query = this.createQueryBuilder('singer').select(); // Create QueryBuilder Object, ('singer') = alias, hst5dmha t7t , select queries

        if(limit){
            query.limit(limit);
        }
        // const singers = await query.getMany();  // kda msh hyrg3 elRelations m3 elSingers
        const singers = await query.leftJoinAndSelect('singer.albums' , 'song-albums').getMany(); 
                        // ana msmy elColumn bta3 elRelation 'albums' fe elsingerEntity, w elTable(entity) esmo 'song-albums'
        // Note: mmkn mt3mlsh koll da w trg3 elSingers bs , w tgeeb elRelations mn el find queries (Relation), zy ma 3mlt abl kda ..
        return singers;
    }

    // (2)
    async getFilteredSingers(limit:number, nationality:string, type:ArtistType, gender:Gender) :Promise<Singer[]>{
        
        const query = this.createQueryBuilder('singer').select();

        // filter first , then get
        
        if(limit){
            query.limit(limit)
        }
        if(nationality){
            query.andWhere('singer.natinality LIKE :nationality' , {nationality}); // SQL query with Condition Where ..
        }
        if(type){
            query.andWhere('singer.type LIKE :type' , {type});  // Type Band Or Single
        }
        if(gender){
            query.andWhere('singer.gender LIKE :gender' , {gender});
        }

        const singers = await query.leftJoinAndSelect('singer.albums' , 'song-albums').getMany();
        return singers;
        
    }

}