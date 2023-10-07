import { Body, Controller, Get, Param, Post, Put , Delete, Query, UseInterceptors, UploadedFile, UseGuards} from "@nestjs/common";
import { SongService } from "./song.service";
import { SongType } from "src/commons/enums/song-type.enum";
import { MusicLanguage } from "src/commons/enums/music.-lang.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { handleFileName } from "src/commons/helpers/multer";
import { ArtistType } from "src/commons/enums/artist-type.enum";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/commons/decorators/roles.decorator";
import { Role } from "src/commons/enums/role.enum";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";

@Controller('songs')
export class SongController{
    constructor(private songService:SongService){}
    // Note : song.source hya el song itself(mp3 file)
    // w el Add New Song htb2a fe el AlbumService , msh el SongService ..
    
    // localhost:3000/songs
    @Get()
    getAllSongs(){
        return this.songService.getAllSongs();
    }

    @Get('limited')
    getLimitedSongs( @Query('limit') limit:number ){
        return this.getLimitedSongs(limit);
    }

    @Get('filtered')
    getFilteredSongs(
        @Query('limit') limit:number,
        @Query('type') type:SongType,
        @Query('rate') rate:number,
        @Query('language') language:MusicLanguage
    )
        
    {
        return this.songService.getFilteredSongs(limit, type, language, rate);
    }

    // Remember: elParametered ykoon a5er endpoint
    @Get(':id')
    getSongById(@Param('id') id:number){
        return this.songService.getSongById(id);
    }

    /*   
    @Post() // htb2a fe el song Albums
    createNewSong(@Body() body:any){

    }
    */
    @Post(':songId/add-to-playlist/:playlistId') // htb2a fe el Music Albums
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    addToPlaylist( @Param('songId') songId:number , @Param('playlistId') playlistId:number ){
        return this.songService.addSongToPlaylist(songId,playlistId);
    }

    @Post(':songId/add-to-favlist/:favlistId') // htb2a fe el song Albums
    @UseGuards(AuthGuard('jwt') , UserAuthGuard) // elGuard 3la mostwa elController kolo
    @Roles([Role.USER])
    addToFavlist( @Param('songId') songId:number , @Param('favlistId') favlistId:number){
        return this.songService.addSongToFavlist(songId,favlistId);
    }

    @Put('update-song/:id')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    @UseInterceptors(FileInterceptor('source' , {
        storage: diskStorage({
            destination: './files/songs',
            filename: handleFileName
        })
    }))
    updateSong(@Param('id') id:number, 
                @Body('name') name: string,
                @Body('description') description: string,
                @Body('artist') artist: ArtistType,
                @Body('type') type:SongType,
                @Body('language') language:MusicLanguage,
                @UploadedFile() source:any
                )
    {
        return this.songService.updateSong(id,name,description,artist,type,language,source.path);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    deleteSong(@Param('id') id:number){
        return this.songService.deleteSong(id);
    }

}