import { Body, Controller, Get, Param, Post, Put , Delete, Query, UseInterceptors, UploadedFile, UseGuards} from "@nestjs/common";
import { CreateNewMusicianAlbumDTO } from "src/commons/dtos/createMusicianAlbum.dto";
import { UpdateMusicianDTO } from "src/commons/dtos/updateMusician.dto";
import { Gender } from "src/commons/enums/gender.enum";
import { MusicianService } from "./musician.service";
import { ArtistType } from "src/commons/enums/artist-type.enum";
import { CreateMusicianDTO } from "src/commons/dtos/createMusician.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { handleFileName } from "src/commons/helpers/multer";
import { AuthGuard } from "@nestjs/passport";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";
import { Roles } from "src/commons/decorators/roles.decorator";
import { Role } from "src/commons/enums/role.enum";

@Controller('musicians')
export class MusicianController{

    constructor(private musicianService:MusicianService){}
    
    // localhost:3000/musicians
    @Get()
    getAllMusicians(){
        return this.musicianService.getAllMusicians();
    }

    @Get('limited')
    getLimitedMusicians( @Query('limit') limit:number ){
        return this.musicianService.getLimitedMusicians(limit);
    }

    @Get('filtered')
    getFilteredMusicians(
        @Query('limit') limit:number,
        @Query('type') type:ArtistType,
        @Query('nationality') nationality:string,
        @Query('gender') gender:Gender
    )
        
    {
        return this.musicianService.getFilteredMusicians(limit,nationality,type,gender);
    }

    @Get(':id')
    getMusicianById(@Param('id') id:number){
        return this.musicianService.getMusicianById(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    @UseInterceptors(FileInterceptor('image' , { 
        storage: diskStorage({
            destination: './images/musicians',  // http://localhost:3000/musicians/4x6img-ce2c.png (To Get Photo HTML) (Assets get from /images)
            filename: handleFileName
        })
    }))
    createNewMusician(@Body() body:CreateMusicianDTO, @UploadedFile() image:any){
        return this.musicianService.addNewmMusician(body.name, body.info, body.gender, body.nationality, body.type, image.path);
    }

    @Post(':id/new-album')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    createNewMusicianAlbum(@Param('id') id:number, @Body() body:CreateNewMusicianAlbumDTO){
        return this.musicianService.createNewAlbum(id, body);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    @UseInterceptors(FileInterceptor('image' , { 
        storage: diskStorage({
            destination: './images/musicians',  // http://localhost:3000/musicians/4x6img-ce2c.png (To Get Photo HTML) (Assets get from /images)
            filename: handleFileName
        })
    }))
    updateMusician(@Param('id') id:number , @Body() body:CreateMusicianDTO, @UploadedFile() image:any){
        return this.musicianService.updateMusician(id, body.name, body.info, body.gender, body.nationality, body.type, image.path);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    deleteMusician(@Param('id') id:number){
        return this.musicianService.deleteMusician(id);
    }

}