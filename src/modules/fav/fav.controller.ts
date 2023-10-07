import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { FavoriteService } from "./fav.service";
import { AuthGuard } from "@nestjs/passport";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";
import { Role } from "src/commons/enums/role.enum";
import { Roles } from "src/commons/decorators/roles.decorator";

// lma y3ml login , hat m3ah elFavList w elProfile ..

@UseGuards(AuthGuard('jwt') , UserAuthGuard) // elGuard 3la mostwa elController kolo
@Roles([Role.USER])
@Controller('fav-lists')
export class FavoriteController{
    constructor(private favService: FavoriteService){}

    @Get(':id')
    getUserFavList(@Param('id') id:number){
        return this.favService.getUserFavList(id);
    }

    // Interaction between favList & Songs w Musics
    // bt3amel fe el favList m3 elTracks , msh el Songs,Musics
    // 3shan elRelation m3 el tracks
    // Note: Push song w music gwa el favList , msh btt3ml hena, lazem fe el SongService ..

    @Delete(':id/clear-fav-list')
    clearFavList(@Param('id') id:number){
        return this.favService.clearFavlistContent(id);
    }

    @Delete(':id/clear-fav-list/:trackId')
    removeTrackFromFavList(@Param('id') id:number , @Param('trackId') trackId:number){
        return this.favService.removeTrackFromFavlist(id, trackId);
    }
}