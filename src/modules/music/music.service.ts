import { MusicRepository } from "./music.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MusicLanguage } from "src/commons/enums/music.-lang.enum";
import { ArtistType } from "src/commons/enums/artist-type.enum";
import * as fs from "fs";
import { DeleteResult } from "typeorm";
import { Music } from "./music.entity";
import { MusicType } from "src/commons/enums/music-type.enum";
import { Track } from "../track/track.entity";
import { FavoriteService } from "../fav/fav.service";
import { PlaylistService } from "../playlist/playlist.service";
import { TrackService } from "../track/track.service";


@Injectable()
export class MusicService{
    constructor(
        @InjectRepository(MusicRepository) private musicRepository:MusicRepository,
        private favService:FavoriteService,
        private playlistService:PlaylistService,
        private trackService:TrackService
    ){}

    // Note : music.source hya el music itself(mp3 file)
    // w el Add New Music htb2a fe el AlbumService , msh el MusicService ..

    async getAllMusics() :Promise<Music[]>{
        return await this.musicRepository.find();
    }

    async getMusicById(id:number) :Promise<Music>{
        const Music = await this.musicRepository.findOneBy({id:id});
        if(!Music){
            throw new NotFoundException('Music is not found');
        }
        return Music;
    }

    async getLimitedMusics(limit:number) :Promise<Music[]>{
        return await this.musicRepository.getLimitedMusics(limit);
    }

    async getFilteredMusics(limit:number, type:MusicType , rate:number) :Promise<Music[]>{
        return this.musicRepository.getFilteredMusics(limit , type, rate);
    }

    async updateMusic(id:number, name:string, description:string, artist:ArtistType, type:MusicType, source:any
    ):Promise<Music>{
        const music = await this.getMusicById(id);
        if(name) music.name = name;
        if(description) music.description = description;
        if(artist) music.artist = artist;
        if(type) music.type = type;
        if(source){
            fs.unlink(music.source, (err)=>{ err? console.error('cannot delete Music from fileSystem') : null});
            music.source = source;
        }
        const updatedMusic = await music.save();
        return updatedMusic;
    } 

    async deleteMusic(id:number):Promise<DeleteResult>{
        let music = await this.getMusicById(id);
        // 1
        for(let i=0; i<music.tracks.length; i++){
            await this.trackService.deleteTrack(music.tracks[i].id);
        }

        // 2
        if(music.source){
            fs.unlink(music.source , (err)=> err? console.error('cannot delete Music from fileSystem') : null );
        }

        // 3
        let deletedMusic = await this.musicRepository.delete(id);
        if(deletedMusic.affected === 0){
            throw new NotFoundException('Music is not exist');
        }
        return deletedMusic;
    }

    async addMusicToFavlist(musicId:number , favlistId:number) :Promise<Track>{
        const music = await this.getMusicById(musicId);
        const track = await this.favService.pushTrackToFavorite(null, music, favlistId);
        return track;
    }

    async addMusicToPlaylist(musicId:number , playlistId:number) :Promise<Track>{
        const music = await this.getMusicById(musicId);
        const track = await this.playlistService.pushTrackToPlaylist(null, music, playlistId);
        return track;
    }
}