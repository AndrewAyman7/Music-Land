import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { SongAlbumService } from "./song-album.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { handleFileName } from "src/commons/helpers/multer";
import { SongType } from "src/commons/enums/song-type.enum";
import { MusicLanguage } from "src/commons/enums/music.-lang.enum";
import { CreateNewMusicianAlbumDTO } from "src/commons/dtos/createMusicianAlbum.dto";

@Controller('song-albums')
export class SongAlbums{
    constructor( private songAlbumService:SongAlbumService ){}

    @Get()
    getAllSongAlbums(){
        return this.songAlbumService.getAllSongAlbums();
    }

    @Get(':id')
    getSongAlbum(@Param('id') id:number){
        return this.songAlbumService.getSongAlbumById(id);
    }

    @Post(':id/new-song')
    @UseInterceptors(FileInterceptor('source' , {
        storage: diskStorage({
            destination: './files/songs',
            filename: handleFileName
        })
    }))
    addNewSong(
        @Param('id') albumId:number, // elSong 3ayz t7otha fe anhy album
        @Body('name') name: string,  // Noteeee: eb2a e3ml DTO w 5od el @Body kolo 3la mra 1
        @Body('description') description: string,
        @Body('artist') artist: string,
        @Body('type') type:SongType,
        @Body('language') language:MusicLanguage,
        @UploadedFile() source:any
    )
    { 
        return this.songAlbumService.createNewSong(albumId, name, description, artist, type, language, source.path);
    }

    @Put(':id/update-album')
    updateAlbum(@Param('id') id:number , @Body() body:CreateNewMusicianAlbumDTO){
        return this.songAlbumService.updateAlbum(id,body);
    }

    @Delete(':id/delete-album')
    deleteAlbum(@Param('id') id:number){
        return this.songAlbumService.deleteAlbum(id);
    }

}