import { Body, Controller, Delete, Get, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { getAuthenticatedUser } from "src/commons/decorators/get-authenticated-user.decorator";
import { handleFileName } from "src/commons/helpers/multer";
import { UserEntity } from "../auth/entities/user.entity";
import { CreateUserProfileDto } from "../auth/dtos/create-user-profile.dto";
import { AuthGuard } from "@nestjs/passport";
import { AcceptedAuthGuard } from "src/commons/guards/accepted-auth.guard";
import { Roles } from "src/commons/decorators/roles.decorator";
import { Role } from "src/commons/enums/role.enum";
import { ProfileService } from "./profile.service";

// 3ayez msln lma user y3ml login , awdeeh 3l profile bta3o
// aw a get el Profile bta3 user mo3yn

@UseGuards(AuthGuard('jwt') , AcceptedAuthGuard) // elGuard 3la mostwa elController kolo
@Roles([Role.ADMIN , Role.USER])
@Controller('profiles')
export class ProfileController{
    constructor(private profileService:ProfileService){}

    @Get('user-profile')
    getUserProfile(@getAuthenticatedUser() user:UserEntity){ // elDecorator ely 3mlto 3shan y fetch elUser mn elRequest, = el @Param()
        console.log(user);
        return this.profileService.getProfileData(user);

        // Explain
        // elUser hy3ml login fa elData bta3to htb2a fe el req.user
        // ana 3ayz b2a lma elUser y3ml login ywdeh 3l Profile bta3o msln
        // mn elA5er 3ayz getProfileById() , bs el id ykoon mn elToken (req.user)
        // fa 3mlt decorator ygeeb elUser mn elRequest w elDecorator = Param
    }

    @Post('user-profile/set-profile-img')
    @UseInterceptors(FileInterceptor('image' , {
        storage: diskStorage({
            destination: './images/profiles',
            filename: handleFileName
        })
    }))
    setProfileImage(@getAuthenticatedUser() user:UserEntity , @UploadedFile() image:any){
        return this.profileService.setProfileImg(user,image.path); // lazemmmm image.path
    }

    @Patch('user-profile/change-profile-img')  // PATCH 3shan edit 1 field , hb3t fe elRequest el img bs
    @UseInterceptors(FileInterceptor('image' , {
        storage: diskStorage({
            destination: './images/profiles',
            filename: handleFileName
        })
    }))
    changeProfileImage(@getAuthenticatedUser() user:UserEntity , @UploadedFile() image:any){
        return this.profileService.changeProfileImg(user,image.path); // lazemmmm image.path
    }

    @Put('user-profile/edit-profile')  // hstlm elData kolha w a8yr zy mna 3ayz
    editProfile(@getAuthenticatedUser() user:UserEntity , @Body() profileData:CreateUserProfileDto){
        return this.profileService.editProfile(user,profileData);
    }

    @Delete('user-profile/delete-profile-img')
    deleteProfileImg(@getAuthenticatedUser() user:UserEntity){
        return this.profileService.deleteProfileImg(user);
    }


}