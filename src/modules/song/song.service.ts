import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SongRepository } from "./song.repository";
import { Song } from "./song.entity";
import { MusicLanguage } from "src/commons/enums/music.-lang.enum";
import { SongType } from "src/commons/enums/song-type.enum";
import { ArtistType } from "src/commons/enums/artist-type.enum";
import * as fs from "fs";
import { DeleteResult } from "typeorm";
import { Track } from "../track/track.entity";
import { FavoriteService } from "../fav/fav.service";
import { PlaylistService } from "../playlist/playlist.service";
import { TrackService } from "../track/track.service";

@Injectable()
export class SongService{
    constructor(
        @InjectRepository(SongRepository) private songRepository:SongRepository,
        private favService:FavoriteService,
        private playlistService:PlaylistService,
        private trackService:TrackService
    ){}

    // Note : song.source hya el song itself(mp3 file)
    // w el Add New Song htb2a fe el AlbumService , msh el SongService ..

    async getAllSongs() :Promise<Song[]>{
        return await this.songRepository.find();
    }

    async getSongById(id:number) :Promise<Song>{
        const song = await this.songRepository.findOneBy({id:id});
        if(!song){
            throw new NotFoundException('song is not found');
        }
        return song;
    }

    async getLimitedSongs(limit:number) :Promise<Song[]>{
        return await this.songRepository.getLimitedSongs(limit);
    }

    async getFilteredSongs(limit:number, type:SongType, language:MusicLanguage , rate:number) :Promise<Song[]>{
        return this.songRepository.getFilteredSongs(limit , type, language , rate);
    }

    async updateSong(id:number, name:string, description:string, artist:ArtistType, type:SongType, language:MusicLanguage, source:any
    ):Promise<Song>{
        const song = await this.getSongById(id);
        if(name) song.name = name;
        if(description) song.description = description;
        if(artist) song.artist = artist;
        if(type) song.type = type;
        if(language) song.language = language;
        if(source){
            fs.unlink(song.source, (err)=>{ err? console.error('cannot delete song from fileSystem') : null});
            song.source = source;
        }
        const updatedSong = await song.save();
        return updatedSong;
    }

    async deleteSong(id:number):Promise<DeleteResult>{
        const song = await this.getSongById(id);
        // 1
        for(let i=0; i<song.tracks.length; i++){
            await this.trackService.deleteTrack(song.tracks[i].id);
        }

        // 2
        if(song.source){
            fs.unlink(song.source , (err)=> err? console.error('cannot delete song from fileSystem') : null );
        }

        // 3
        const deletedSong = await this.songRepository.delete(id);
        if(deletedSong.affected === 0){
            throw new NotFoundException('Song is not exist');
        }
        return deletedSong;
    }

    async addSongToFavlist(songId:number , favlistId:number) :Promise<Track>{
        const song = await this.getSongById(songId);
        const track = await this.favService.pushTrackToFavorite(song, null, favlistId);
        return track;
    }

    async addSongToPlaylist(songId:number , playlistId:number) :Promise<Track>{
        const song = await this.getSongById(songId);
        const track = await this.playlistService.pushTrackToPlaylist(song, null, playlistId);
        return track;
    }
}