import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { getAuthenticatedUser } from "src/commons/decorators/get-authenticated-user.decorator";
import { UserEntity } from "../auth/entities/user.entity";
import { playlistDTO } from "./dtos/playlist.dto";
import { PlaylistService } from "./playlist.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/commons/decorators/roles.decorator";
import { Role } from "src/commons/enums/role.enum";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";

@UseGuards(AuthGuard('jwt') , UserAuthGuard) // elGuard 3la mostwa elController kolo
@Roles( [Role.USER] )
@Controller('playlists')
export class PlaylistController{

    constructor(private playlistService:PlaylistService){}

    @Get('user-playlists')
    getUserPlaylists(@getAuthenticatedUser() user:UserEntity){
        console.log(user)
        return this.playlistService.getUserPlaylists(user);
    }

    @Get(':id')
    getUserPlaylistById(@Param('id') id:number){
        return this.playlistService.getUserPlaylistById(id);
    }

    @Post('new-playlist')
    createPlaylist(@Body() playlistData:playlistDTO , @getAuthenticatedUser() user:UserEntity){ // 3ayz elPlaylist data , w elUser ely 3amlha
        return this.playlistService.createPlaylist(playlistData,user);
    }

    @Put('update-playlist/:id')
    updatePlaylist(@Param('id') id:number , @Body() playlistData:playlistDTO){ // 3ayz elPlaylist data , w elUser ely 3amlha
        return this.playlistService.updatePlaylist(id,playlistData);
    }

    @Delete('delete/:id')
    deletePlaylist(@Param('id') id:number){
        return this.playlistService.deletePlaylist(id);
    }

    @Delete('clear-playlist/:id')
    clearPlaylist(@Param('id') id:number){
        return this.playlistService.clearPlaylistContent(id);
    }

    @Delete(':playlistId/remove-track-playlist/:id')
    removeTrackFromPlaylist(@Param('playlistId') playlistId:number, @Param('trackId') trackId:number){
        return this.playlistService.removeTrackFromPlaylist(playlistId, trackId);
    }
}