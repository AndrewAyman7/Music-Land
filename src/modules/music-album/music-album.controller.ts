import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { MusicAlbumService } from "./music-album.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { handleFileName } from "src/commons/helpers/multer";
import { MusicType } from "src/commons/enums/music-type.enum";
import { CreateNewMusicianAlbumDTO } from "src/commons/dtos/createMusicianAlbum.dto";
import { AuthGuard } from "@nestjs/passport";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";
import { Role } from "src/commons/enums/role.enum";
import { Roles } from "src/commons/decorators/roles.decorator";

@Controller('music-albums')
export class MusicAlbums{
    constructor(private musicAlbumService:MusicAlbumService){}

    @Get()
    getAllMusicAlbums(){
        return this.musicAlbumService.getAllMusicAlbums();
    }

    @Get(':id')
    getMusicianAlbum(@Param('id') id:number){
        return this.musicAlbumService.getMusicAlbumById(id);
    }


    @Post(':id/new-music')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    @UseInterceptors(FileInterceptor('source' , {
        storage: diskStorage({
            destination: './files/musics',
            filename: handleFileName
        })
    }))
    addNewMusic(
        @Param('id') albumId:number, // elMusic 3ayz t7otha fe anhy album
        @Body('name') name: string,  // Noteeee: eb2a e3ml DTO w 5od el @Body kolo 3la mra 1
        @Body('description') description: string,
        @Body('artist') artist: string,
        @Body('type') type:MusicType,
        @UploadedFile() source:any
    )
    { 
        return this.musicAlbumService.createNewMusic(albumId, name, description, artist, type, source.path);
    }


    @Put(':id/update-album')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    updateAlbum(@Param('id') id:number , @Body() body:CreateNewMusicianAlbumDTO){
        return this.musicAlbumService.updateAlbum(id,body);
    }

    @Delete(':id/delete-album')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    deleteAlbum(@Param('id') id:number){
        return this.musicAlbumService.deleteAlbum(id);
    }

}