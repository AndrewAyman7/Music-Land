import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerRepository } from './singer.repository';
import { Singer } from './singer.entity';
import { ArtistType } from 'src/commons/enums/artist-type.enum';
import { Gender } from 'src/commons/enums/gender.enum';
import { CreateNewMusicianAlbumDTO } from 'src/commons/dtos/createMusicianAlbum.dto';
import { SongAlbum } from '../song-album/song-album.entity';
import { DeleteResult } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class SingerService {
    constructor( @InjectRepository(SingerRepository) private singerRepository:SingerRepository ){} // Provider

    async getAllSingers() :Promise<Singer[]>{
        return await this.singerRepository.find(); // await : 3shan el find() btrg3 promise
    }

    async getSingerById(id) :Promise<Singer>{
        let singer = await this.singerRepository.findOneBy({id:id});
        if(singer){
            return singer; 
        }
        else{
            throw new NotFoundException('singer not found');
        }
    }

    getLimitedSingers(limit) :Promise<Singer[]> { // hya async , bs e3ml async await tany 3shan de haga 5asa bel order bta3 el instructions
        return this.singerRepository.getLimitedSingers(limit);
    }

    getFilteredSingers(limit:number, nationality:string, type:ArtistType, gender:Gender) :Promise<Singer[]>{
        return this.singerRepository.getFilteredSingers(limit,nationality,type,gender);
    }

    async addNewSinger(name:string, info:string, gender:Gender, nationality:string, type:ArtistType, image:any) :Promise<Singer> {
        // Note: el DTO msh ht5le elInputs fel Body Restricted aw Required
        //       lw 3ayz elDTO tsht8l ka validation leek fe el Nest Project -> 8ayr el tsconfig , 5le haga fehom true
        //       bs tab3n a7sn haga lel validate enk t validate el DTOs by class-validator
        //       w 5ale kol el props de 1 prop : 1 @Body()

        // return this.singerRepository.save( {name,info,gender,nationality,type,image} );
        // you can write just elCode ely fo2, bs msh Restricted kdaa ..

        const singer = new Singer(); // h3ml object mn class Singer
        singer.name = name;
        singer.info = info;
        singer.gender = gender;
        singer.nationality = nationality;
        singer.type = type;
        singer.albums = []
        singer.image = image; // = path -> 3shan ana 3amel pass lel image:image.path

        const savedSinger = await singer.save();
        return savedSinger;
    }

    async updateSinger(id:number, name:string, info:string, gender:Gender, nationality:string, type:ArtistType, image:any) :Promise<Singer> {
        let singer = await this.getSingerById(id);
        if(name) singer.name = name;
        if(info) singer.info = info;
        if(gender) singer.gender = gender;
        if(nationality) singer.nationality = nationality;
        if(type) singer.type = type;
        if(image) {
            fs.unlink(singer.image , (err)=>{ err? console.error('cannot delete photo from fileSystem') : null}); // 1- ems7 elAdema mn el Server
            singer.image = image; // = path -> 3shan ana 3amel pass lel image:image.path
        }

        const updatedSinger = await singer.save(); // ba3adel elData w b3den a3mlha save
        return updatedSinger;
    }

    async deleteSinger(id:number) :Promise<DeleteResult>{ // el TypeORM 3amla type m5soos lel delete
        let singer = await this.singerRepository.findOneBy({id})
        if(singer.image){
            fs.unlink(singer.image , (err)=>{ err? console.error('cannot delete photo from fileSystem') : null}); // image = path
        }
        let deletedSinger = await this.singerRepository.delete(id);
        if(deletedSinger.affected === 0){
            throw new NotFoundException('singer not found');
        }
        return deletedSinger; // Type 'DeleteResult' is missing , 3shan kda lazem a3ml elReturn Type : DeleteResult
        // returns elDeletedSinger w data kman
    }

    async createNewAlbum(singerId:number, createAlbumDTO:CreateNewMusicianAlbumDTO){
        const singer = await this.singerRepository.findOneBy({id:singerId}); // 1- get Album Singer
        const {name} = createAlbumDTO;

        const newAlbum = new SongAlbum();
        newAlbum.singer = singer; // this will make foreigKey -> singerId (lw7dhaa)
        newAlbum.name = name;
        newAlbum.image = singer.image;

        const newCreatedAlbum = await newAlbum.save();
        return newCreatedAlbum;
    }


}
