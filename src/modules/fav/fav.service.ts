import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FavoriteList } from "./favorite.entity";
import { Repository } from "typeorm";
import { Profile } from "passport";
import { TrackService } from "../track/track.service";
import { Song } from "../song/song.entity";
import { Music } from "../music/music.entity";
import { Track } from "../track/track.entity";

@Injectable()
export class FavoriteService{
    constructor(
        @InjectRepository(FavoriteList) private favListRepository:Repository<FavoriteList>,
        private trackService:TrackService
    ){}

    // hnadeeha mn el AuthService (userService)

    async getUserFavList(id:number, profile?:Profile):Promise<FavoriteList>{ // 3shan lw 3ayz ageeb elFavList bel Profile (Optioanl)
        let favList = null;
        if(id){
            favList = await this.favListRepository.findOneBy({id});
        }
        else if(profile){
            favList = await this.favListRepository.findOneBy({}); // shoof elSyntax
        }
        else{
            throw new NotFoundException('list not exist');
        }

        return favList;
    }

    async pushTrackToFavorite(song:Song, music:Music, favlistId:number) :Promise<Track>{
        // Note : 100% By Me -> mknsh 3amel ayy validations hena, kont mmkn a3ml push fe ay favlist 100 mraa ..
        const favoriteList = await this.getUserFavList(favlistId);
        if(favoriteList){
            const track = this.trackService.pushTrackToFavlist(song,music,favoriteList);
            return track;
        }else{
            throw new NotFoundException('favList not found');
        }
        
    }

    async removeTrackFromFavlist(favlistId:number, trackId:number){
        const favoriteList = await this.getUserFavList(favlistId);
        for(let i=0; i<favoriteList.tracks.length; i++){
            if(favoriteList.tracks[i].id === trackId){
                await this.trackService.deleteTrack(trackId);
            }
        }
    }

    async clearFavlistContent(favlistId:number){
        const favoriteList = await this.getUserFavList(favlistId);
        // Note: msh htsht8ll mn 8er -> {eager:true} fe el entity
        //       3shan lma ygeeb el favlist, yrg3 m3aha el tracks
        for(let i=0; i<favoriteList.tracks.length; i++){
            await this.trackService.deleteTrack(favoriteList.tracks[i].id);
        }
        favoriteList.tracks = [];
        return await favoriteList.save();
    }

    // why loop ?  , akeed fe tare2a eny afddy elArray fe elDB 8er eny amshy 1 1
    // No .. no way , 3shan el favlist.tracks[] , el values bta3tha = rows of Tracks Table , w elTracks Table feeh million track ,
    // fa lazem aroo7 w a3ml deleteTrack By Id .. le kol 1 fehom
    // 3shan elArray hena field fe object , fa ana 3ayz a5le el row hwa hwa, bs ams7 el field elArray da bs
    // tb mat3mlo delete?? ,, bardo laaaaa , ana msh 3ayz ams7 el tracks[], ana 3ayz a5leha bs tkoon empty
    // fa lazem ams7  wa7da wa7da mn el Track Table
    // w fe elA5er a3ml fav.tracks = [];  // faddy el Array mn el IDs


    async deleteFavlist(id:number){
        await this.clearFavlistContent(id)
        const deletedFav = await this.favListRepository.delete(id);
        if(deletedFav.affected === 0) throw new NotFoundException('favlist not found'); // 404 StatusCode
        return deletedFav;
    }


}