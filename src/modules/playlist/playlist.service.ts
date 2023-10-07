import { Injectable, NotFoundException } from "@nestjs/common";
import { PlayListRepositpry } from "./playlist.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../auth/entities/user.entity";
import { Playlist } from "./playlist.entity";
import { playlistDTO } from "./dtos/playlist.dto";
import { DeleteResult } from "typeorm";
import { Song } from "../song/song.entity";
import { Music } from "../music/music.entity";
import { Track } from "../track/track.entity";
import { TrackService } from "../track/track.service";

@Injectable()
export class PlaylistService{
    constructor(
        @InjectRepository(PlayListRepositpry) private playlistRepository:PlayListRepositpry,
        private trackService:TrackService
        ){}

    async getUserPlaylists(user:UserEntity) :Promise<Playlist[]>{
        //console.log(user)
        return await this.playlistRepository.getUserPlaylists(user.id);
    }

    async getUserPlaylistById(id:number) :Promise<Playlist>{
        const playlist = this.playlistRepository.findOne({ where: {id} });
        if(!playlist) throw new NotFoundException('playlist not found');
        return playlist;
    } 

    async createPlaylist(playlistData:playlistDTO , user:UserEntity) :Promise<Playlist>{
        // ha5od eluser 3shan lma a3ml playlist a3rf de tb3 meen w a5leha b esmo (foreignKey)
        const playlist = new Playlist();
        playlist.name = playlistData.name;
        playlist.user = user; // will create foreignKey : userId , bos el playlistEntity elRealtion (bta5od el user w trg3 userId FK)
        playlist.tracks = [];

        
        return await playlist.save();
    }

    async updatePlaylist(id:number, playlistData:playlistDTO) :Promise<Playlist>{
        const playlist = await this.getUserPlaylistById(id);
        if(playlistData.name) playlist.name = playlistData.name;
        return await playlist.save();
    }

    async deletePlaylist(id:number) :Promise<DeleteResult>{
        // 1- Delete playlist Content (tracks) , lazem ams7 elTracks bta3tha mn table elTracks , FKs
        // 2- Delete The playlist itself
        // Note: lma ykoon fe Relation 1-To-M -> awl haga ems7 elMany(Tracks) then ems7 el 1 (playlist)
        // Note: msh htsht8ll mn 8er -> {eager:true} fe el entity
        //       3shan lma ygeeb el playlist, yrg3 m3aha el tracks
        await this.clearPlaylistContent(id);
        const deleteRes = await this.playlistRepository.delete(id);
        if(deleteRes.affected === 0) throw new NotFoundException('playlist not found');
        return deleteRes;
    }

    // Interaction with track and songs,musics

    async pushTrackToPlaylist(song:Song, music:Music, playlistId:number) :Promise<Track>{
        // Note : 100% By Me -> mknsh 3amel ayy validations hena, kont mmkn a3ml push fe ay playlist 100 mraa ..
        const playlist = await this.getUserPlaylistById(playlistId);
        if(playlist){
            const track = this.trackService.pushTrackToPlaylist(song,music,playlist);
            return track;
        }else{
            throw new NotFoundException('playlist not found');
        }
        
    }

    async removeTrackFromPlaylist(playlistId:number, trackId:number){
        const playlist = await this.getUserPlaylistById(playlistId)
        for(let i=0; i<playlist.tracks.length; i++){
            if(playlist.tracks[i].id === trackId){
                await this.trackService.deleteTrack(trackId);
            }
        }
    }

    async clearPlaylistContent(playlistId:number){
        const playlist = await this.getUserPlaylistById(playlistId);
        // Note: msh htsht8ll mn 8er -> {eager:true} fe el entity m3 el tracks relations
        //       3shan lma ygeeb el playlist, yrg3 m3aha el tracks
        for(let i=0; i<playlist.tracks.length; i++){
            await this.trackService.deleteTrack(playlist.tracks[i].id);
        }
        playlist.tracks = [];
        return await playlist.save();
    }
}