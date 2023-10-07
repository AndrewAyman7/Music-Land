import { Body, Controller, Get, Param, Post, Put , Delete, Query, UseInterceptors, UploadedFile, UseGuards, ParseIntPipe} from "@nestjs/common";
import { MusicType } from "src/commons/enums/music-type.enum";
import { MusicService } from "./music.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { handleFileName } from "src/commons/helpers/multer";
import { ArtistType } from "src/commons/enums/artist-type.enum";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/commons/decorators/roles.decorator";
import { Role } from "src/commons/enums/role.enum";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";

@Controller('musics')
export class MusicController{
    constructor(private musicService:MusicService){}

    // Note : music.source hya el music itself(mp3 file)
    // w el Add New Music htb2a fe el AlbumService , msh el MusicService ..

    // localhost:3000/musics
    @Get()
    getAllMusics(){
        return this.musicService.getAllMusics();
    }

    @Get('limited')
    getLimitedMusics( @Query('limit') limit:number ){
        return this.musicService.getLimitedMusics(limit);
    }

    @Get('filtered')
    getFilteredMusics(
        @Query('limit') limit:number,
        @Query('type') type:MusicType,
        @Query('rate') rate:number,
    )
        
    {
        return this.musicService.getFilteredMusics(limit,type,rate);
    }

    // Remember: elParametered ykoon a5er endpoint
    @Get(':id')
    getMusicById(@Param('id') id:number){
        return this.musicService.getMusicById(id);
    }

    /*
    @Post() // htb2a fe el Music Albums
    createNewMusic(@Body() body:any){

    }
    */

    @Post(':musicId/add-to-playlist/:playlistId') // htb2a fe el Music Albums
    @UseGuards(AuthGuard('jwt') , UserAuthGuard) // elGuard 3la mostwa elController kolo
    @Roles([Role.USER])
    addToPlaylist( @Param('musicId') musicId:number , @Param('playlistId') playlistId:number){
        return this.musicService.addMusicToPlaylist(musicId,playlistId);
    }

    @Post(':musicId/add-to-favlist/:favlistId') // htb2a fe el Music Albums
    @UseGuards(AuthGuard('jwt') , UserAuthGuard) // elGuard 3la mostwa elController kolo
    @Roles([Role.USER])
    addToFavlist( @Param('musicId') musicId:number , @Param('favlistId') favlistId:number){
        return this.musicService.addMusicToFavlist(musicId, favlistId);
    }

    @Put('update-music/:id')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    @UseInterceptors(FileInterceptor('source' , {
        storage: diskStorage({
            destination: './files/musics',
            filename: handleFileName
        })
    }))
    updateMusic(@Param('id' , ParseIntPipe) id:number, 
                @Body('name') name: string,
                @Body('description') description: string,
                @Body('artist') artist: ArtistType,
                @Body('type') type:MusicType,
                @UploadedFile() source:any
                )
    {
        return this.musicService.updateMusic(id,name,description,artist,type,source.path);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    deleteMusic(@Param('id') id:number){
        return this.musicService.deleteMusic(id);
    }

}