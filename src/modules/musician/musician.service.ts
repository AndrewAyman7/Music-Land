import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistType } from 'src/commons/enums/artist-type.enum';
import { Gender } from 'src/commons/enums/gender.enum';
import { CreateNewMusicianAlbumDTO } from 'src/commons/dtos/createMusicianAlbum.dto';
import { DeleteResult } from 'typeorm';
import * as fs from 'fs';
import { MusicianRepository } from './musician.repository';
import { Musician } from './musician.entity';
import { MusicAlbum } from '../music-album/music-album.entity';

@Injectable()
export class MusicianService {
    constructor( @InjectRepository(MusicianRepository) private musicianRepository:MusicianRepository ){} // Provider

    async getAllMusicians() :Promise<Musician[]>{
        return await this.musicianRepository.find() // await : 3shan el find() btrg3 promise
    }

    async getMusicianById(id) :Promise<Musician>{
        let musician = await this.musicianRepository.findOneBy({id:id});
        if(musician){
            return musician; 
        }
        else{
            throw new NotFoundException('musician not found');
        }
    }

    getLimitedMusicians(limit) :Promise<Musician[]> { // hya async , bs e3ml async await tany 3shan de haga 5asa bel order bta3 el instructions
        return this.musicianRepository.getLimitedMusicians(limit);
    }

    getFilteredMusicians(limit:number, nationality:string, type:ArtistType, gender:Gender) :Promise<Musician[]>{
        return this.musicianRepository.getFilteredMusicians(limit,nationality,type,gender);
    }

    async addNewmMusician(name:string, info:string, gender:Gender, nationality:string, type:ArtistType, image:any) :Promise<Musician> {
        // Note: el DTO msh ht5le elInputs fel Body Restricted aw Required
        //       lw 3ayz elDTO tsht8l ka validation leek fe el Nest Project -> 8ayr el tsconfig , 5le haga fehom true
        //       bs tab3n a7sn haga lel validate enk t validate el DTOs by class-validator
        //       w 5ale kol el props de 1 prop : 1 @Body()

        // return this.musicianRepository.save( {name,info,gender,nationality,type,image} );
        // you can write just elCode ely fo2, bs msh Restricted kdaa ..

        const musician = new Musician(); // h3ml object mn class musician
        musician.name = name;
        musician.info = info;
        musician.gender = gender;
        musician.nationality = nationality;
        musician.type = type;
        musician.albums = [];
        musician.image = image; // = path -> 3shan ana 3amel pass lel image:image.path

        const savedmusician = await musician.save();
        return savedmusician;
    }

    async updateMusician(id:number, name:string, info:string, gender:Gender, nationality:string, type:ArtistType, image:any) :Promise<Musician> {
        let musician = await this.getMusicianById(id);
        if(name) musician.name = name;
        if(info) musician.info = info;
        if(gender) musician.gender = gender;
        if(nationality) musician.nationality = nationality;
        if(type) musician.type = type;
        if(image) {
            fs.unlink(musician.image , (err)=>{ err? console.error('cannot delete photo from fileSystem') : null}); // 1- ems7 elAdema mn el Server
            musician.image = image; // = path -> 3shan ana 3amel pass lel image:image.path
        }

        const updatedmusician = await musician.save(); // ba3adel elData w b3den a3mlha save
        return updatedmusician;
    }

    async deleteMusician(id:number) :Promise<DeleteResult>{ // el TypeORM 3amla type m5soos lel delete
        let musician = await this.musicianRepository.findOneBy({id})
        if(musician.image){
            fs.unlink(musician.image , (err)=>{ err? console.error('cannot delete photo from fileSystem') : null}); // image = path
        }
        let deletedmusician = await this.musicianRepository.delete(id);
        if(deletedmusician.affected === 0){
            throw new NotFoundException('musician not found');
        }
        return deletedmusician; // Type 'DeleteResult' is missing , 3shan kda lazem a3ml elReturn Type : DeleteResult
        // returns elDeletedmusician w data kman
    }

    async createNewAlbum(musicianId:number, createAlbumDTO:CreateNewMusicianAlbumDTO){
        const musician = await this.musicianRepository.findOneBy({id:musicianId}); // 1- get Album musician
        const {name} = createAlbumDTO;

        const newAlbum = new MusicAlbum();
        newAlbum.musician = musician; // this will make foreigKey -> musicianId (lw7dhaa)
        newAlbum.name = name;
        newAlbum.image = musician.image;

        const newCreatedAlbum = await newAlbum.save();
        return newCreatedAlbum;
    }


}