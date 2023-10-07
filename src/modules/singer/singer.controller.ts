import { Body, Controller, Get, Param, Post, Put , Delete, Query, UseInterceptors, UploadedFile, UseGuards} from "@nestjs/common";
import { CreateNewMusicianAlbumDTO } from "src/commons/dtos/createMusicianAlbum.dto";
import { UpdateMusicianDTO } from "src/commons/dtos/updateMusician.dto";
import { Gender } from "src/commons/enums/gender.enum";
import { SingerService } from "./singer.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMusicianDTO } from "src/commons/dtos/createMusician.dto";
import { handleFileName } from "src/commons/helpers/multer";
import { diskStorage } from "multer";
import { AuthGuard } from "@nestjs/passport";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";
import { Roles } from "src/commons/decorators/roles.decorator";
import { Role } from "src/commons/enums/role.enum";

@Controller('singers')
export class SingerController{

    constructor( private singerService:SingerService ){}
    
    // localhost:3000/singers
    @Get()
    getAllSingers(){
        return this.singerService.getAllSingers(); 
    }

    @Get('limited')
    getLimitedSingers( @Query('limit') limit:number ){
        return this.singerService.getLimitedSingers(limit);
    }

    @Get('filtered')
    getFilteredSingers(
        @Query('limit') limit:number,
        @Query('type') type:string,
        @Query('nationality') nationality:string,
        @Query('gender') gender:Gender
    )
    {
        return this.getFilteredSingers(limit,type,nationality,gender);
    }

    // Remember: elParametered ykoon a5er endpoint
    @Get(':id')
    getSingerById(@Param('id') id:number){
        return this.singerService.getSingerById(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    @UseInterceptors(FileInterceptor('image' , {
        storage: diskStorage({
            destination: './images/singers',  // http://localhost:3000/singers/4x6img-ce2c.png (To Get Photo HTML) (Assets get from /images )
            filename: handleFileName
        })
    })) // req.body.image
    createNewSinger(@Body() body:CreateMusicianDTO , @UploadedFile() image:any){ // e3ml DTO w 5od elData kolha as a 1 body , object
        //console.log(body);
        //console.log(image);
        this.singerService.addNewSinger(body.name,body.info,body.gender,body.nationality,body.type, image.path);
    }

    @Post(':id/new-album')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    createNewSingerAlbum(@Param('id') id:number, @Body() body:CreateNewMusicianAlbumDTO){
        const {name} = body;
        return this.singerService.createNewAlbum(id, body);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    @UseInterceptors(FileInterceptor('image' , {
        storage: diskStorage({
            destination: './images/singers',  // http://localhost:3000/singers/4x6img-ce2c.png (To Get Photo HTML)
            filename: handleFileName
        })
    }))
    updateSinger(@Param('id') id:number , @Body() body: CreateMusicianDTO, @UploadedFile() image:any){
        return this.singerService.updateSinger(id,body.name,body.info,body.gender,body.nationality,body.type, image.path);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    deleteSinger(@Param('id') id:number){
        return this.singerService.deleteSinger(id);
    }

}