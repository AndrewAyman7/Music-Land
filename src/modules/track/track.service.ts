import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Song } from "../song/song.entity";
import { Music } from "../music/music.entity";
import { FavoriteList } from "../fav/favorite.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Track } from "./track.entity";
import { Repository } from "typeorm";
import { Playlist } from "../playlist/playlist.entity";

@Injectable()
export class TrackService{
    constructor(@InjectRepository(Track) private trackRepository:Repository<Track>){}

    // 1
    async pushTrackToFavlist(song:Song , music:Music , favlist:FavoriteList):Promise<Track>{

        // Note : e3ml elAwl lw elTrack da mwgood fe el favlist de , e3ml Exception 'already added'

        // Note : 100% By Me -> mknsh 3amel ayy validations hena, kont mmkn a3ml push fe ay favlist 100 mraa ..
        let isTrackAlreadyAdded = await this.trackRepository.findOne({where: ({songId:song.id} || {musicId:music.id}) && {favoriteListId:favlist.id}});
        if(isTrackAlreadyAdded) throw new BadRequestException('Track already added');
        let track = new Track();
        this.checkTrackType(track,song,music); // return the track after adding fields
        track.favoriteList = favlist;
        return await track.save();
    }

    async pushTrackToPlaylist(song:Song , music:Music , playlist:Playlist):Promise<Track>{

        // Note : e3ml elAwl lw elTrack da mwgood fe el playlist de , e3ml Exception 'already added'

        // Note : 100% By Me -> mknsh 3amel ayy validations hena, kont mmkn a3ml push fe ay playlist 100 mraa ..
        let isTrackAlreadyAdded = await this.trackRepository.findOne({where: ( {songId:song.id} || {musicId:music.id} ) && {playlistId:playlist.id}});
        // or , lw 3ayz my3mlsh loops kteer w y3dy 3la property 1 fe el loop bdl 2 , e3ml :
        /*
            let isTrackAlreadyAdded;
            if(music){
                isTrackAlreadyAdded = await this.trackRepository.findOne( {where: {musicId:music.id} && {playlistId:playlist.id} } );
            }
            if(song){
                isTrackAlreadyAdded = await this.trackRepository.findOne( {where: {songId:song.id} && {playlistId:playlist.id} } );
            }
        */

        console.log(isTrackAlreadyAdded);
        if(isTrackAlreadyAdded) throw new BadRequestException('Track already added');
        let track = new Track();
        this.checkTrackType(track,song,music); // return the track after adding fields
        track.playlist = playlist;
        return await track.save();
    }

    checkTrackType(track:Track, song:Song , music:Music){
        if(song){
            track.song = song;
            track.title = song.name;
            track.link = song.source;
            // w el ba2y hyb2a null , track.music
        }
        else if(music){
            track.music = music;
            track.title = music.name;
            track.link = music.source;
        }
        return track;
    }

    // 2
    async deleteTrack(trackId:number){
        const res = await this.trackRepository.delete(trackId);
        if(res.affected === 0){
            throw new NotFoundException('track not found');
        }
        return res;
    }

}