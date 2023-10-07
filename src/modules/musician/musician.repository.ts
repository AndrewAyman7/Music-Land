import { DataSource, EntityRepository, Repository } from "typeorm";
import { ArtistType } from "src/commons/enums/artist-type.enum";
import { Gender } from "src/commons/enums/gender.enum";
import { Musician } from "./musician.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MusicianRepository extends Repository<Musician>{

    constructor(private dataSource:DataSource){
        super(Musician, dataSource.createEntityManager())
    }

    // (1)
    async getLimitedMusicians(limit:number) :Promise<Musician[]>{

        const query = this.createQueryBuilder('musician').select(); // Create QueryBuilder Object, ('musician') = alias, hst5dmha t7t , select queries
        
        if(limit){
            query.limit(limit);
        }
        // const Musicians = await query.getMany();  // kda msh hyrg3 elRelations m3 elMusicians
        const Musicians = await query.leftJoinAndSelect('musician.albums' , 'music-albums').getMany(); 
                        // ana msmy elColumn bta3 elRelation 'albums' fe elMusicianEntity, w elTable(entity) esmo 'song-albums'
        // Note: mmkn mt3mlsh koll da w trg3 elMusicians bs , w tgeeb elRelations mn el find queries (Relation), zy ma 3mlt abl kda ..
        return Musicians;
    }

    // (2)
    async getFilteredMusicians(limit:number, nationality:string, type:ArtistType, gender:Gender) :Promise<Musician[]>{
        
        const query = this.createQueryBuilder('musician').select();

        // filter first , then get
        
        if(limit){
            query.limit(limit)
        }
        if(nationality){
            query.andWhere('musician.natinality LIKE :nationality' , {nationality}); // SQL query with Condition Where ..
        }
        if(type){
            query.andWhere('musician.type LIKE :type' , {type});  // Type Band Or Single
        }
        if(gender){
            query.andWhere('musician.gender LIKE :gender' , {gender});
        }

        const Musicians = await query.leftJoinAndSelect('musician.albums' , 'music-albums').getMany();
        return Musicians;
        
    }

}