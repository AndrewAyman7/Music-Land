import {Controller , Post , Body, ValidationPipe, UsePipes, Get, UseGuards, Request, Req, Put, Param, Delete} from '@nestjs/common';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { UserAuthDto } from './dtos/user-auth.dto';
import { AuthService } from './auth.service';
import { loginDTO } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from 'src/commons/guards/user-auth.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { AdminAuthGuard } from 'src/commons/guards/admin-auth.guard';
import { getAuthenticatedUser } from 'src/commons/decorators/get-authenticated-user.decorator';
import { UserEntity } from './entities/user.entity';
import { AcceptedAuthGuard } from 'src/commons/guards/accepted-auth.guard';

@Controller('auth')
export class AuthController{

    constructor(private authService:AuthService){}

    @Post('register')
    signUp(@Body(ValidationPipe)  userData:CreateUserProfileDto){
        // hnady 1 w hya tnady elBa2y ..

        // Note: Use try{} catch{} , async await

        return this.authService.signUp(userData);
    }

    @Post('login')
    singIn(@Body(ValidationPipe) loginData:loginDTO){
        // Note: Use try{} catch{}
        return this.authService.signIn(loginData);
    }

    @Post('login/admin')
    singInAdmin(@Body(ValidationPipe) loginData:loginDTO){
        // Note: Use try{} catch{}
        return this.authService.signInAdmin(loginData);
    }

    @Get('system-users')
    @UseGuards(AuthGuard('jwt') , AdminAuthGuard)
    @Roles([Role.ADMIN])
    getAllSystemUsers(){
        return this.authService.getAllSystemUsers();
    }

    @Get('user-tmp')
    @UseGuards(AuthGuard('jwt'), UserAuthGuard) // byshoof el req feeh token wla la , // btegy mn elPassport , w bdeha no3 elGuard ely 3amlo,
    @Roles([Role.USER]) // just Description, mloosh lazmaaaa
    tmpUserEndoint(@Req() req:Request){
        //console.log(req)
        return 'hello user, you are Authorized';
    }

    @Get('admin-tmp')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.ADMIN])
    tmpAdminEndoint(){
        return 'hello Admin, you are Authorized'
    }

    // lma elUser y3ml Login , 5od elUSer mn elRequest w hatlo el profile bta3o w elFavList
    @Get('user-main-data')
    @UseGuards(AuthGuard('jwt'), AcceptedAuthGuard )
    @Roles([Role.ADMIN])
    getUserData(@getAuthenticatedUser() user:UserEntity){ // elDecorator ely 3mlto 3shan y fetch elUser mn elRequest, = el @Param()
        return this.authService.getUserData(user);
    }

    @Put('set-admin/:userId')
    @UseGuards(AuthGuard('jwt'), AcceptedAuthGuard )
    @Roles([Role.ADMIN])
    setAdmin(@Param('userId') userId:number){
        return this.authService.setAdmin(userId);
    }

    @Delete('delete-user-account')
    @UseGuards(AuthGuard('jwt'), AdminAuthGuard)
    @Roles([Role.USER])
    deleteUser(@getAuthenticatedUser() user:UserEntity){
        return this.authService.deleteUserAccount(user);
    }

}