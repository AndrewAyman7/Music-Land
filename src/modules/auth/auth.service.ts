import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { UserAuthDto } from './dtos/user-auth.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcryptjs'; // @types/bcryptjs
import { ProfileEntity } from '../profile/profile.entity';
import { FavoriteList } from '../fav/favorite.entity';
import { Role } from 'src/commons/enums/role.enum';
import { Auth } from 'src/commons/classes/auth';
import { loginDTO } from './dtos/login.dto';
import { JwtPayload } from 'src/commons/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ProfileService } from '../profile/profile.service';
import { FavoriteService } from '../fav/fav.service';
import { PlaylistService } from '../playlist/playlist.service';
import { DeleteResult } from 'typeorm';
dotenv.config();


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserRepository) private userRepository:UserRepository,
        private jwtService:JwtService,
        private profileService:ProfileService,
        private favListService:FavoriteService,
        private playlistService:PlaylistService
    ){}

    // Remember : ana lazem a3ml el 3 Relation m3 b3d fe nfs elWa2t (userAuth - profile - favList)
    //            fa h3mlhom call m3 b3d fe nfs elWa2t , wa7da tnady elTanya w elTanya tnday elTalta
    
    async signUp(userData:CreateUserProfileDto) :Promise<void>{
        const {email, password , username} = userData;

        const isUsernameExist = await this.userRepository.findUserByName(username);
        const isEmailExist = await this.userRepository.findUserByEmail(email);
        // const isEmailExist = await this.userRepository.findOne( { where: {email: email} } );

        if(isUsernameExist){ 
            console.log(isUsernameExist);
            throw new BadRequestException('username is already used');
        } 
        if(isEmailExist){
            console.log(isEmailExist);
            throw new BadRequestException('Email is already used');
        }

        const user = new UserEntity();
        user.username = username;
        user.email = email;
        user.roles = [Role.USER];
        user.salt = await bcrypt.genSalt();
        console.log(email , username ,password , user.salt);
        user.password = await this.userRepository.hashPassword(password, user.salt);

        const {firstName,lastName,age,phone,gender,country,city,address} = userData;

        user.profile = await this.createProfile(user,firstName,lastName,age,phone,gender,country,city,address);

        user.auth = new Auth(); // msh hst5dmom fe elProject asasan , lw 3ayz tst5dma est5dm 0Auth msh passport-jwt
        user.auth.facebookId = null;
        user.auth.gmailId = null;
        user.auth.validEmail = false; // lma t3ml verify elAwl , eb2a 5leha true

        await user.save();
    }

    async createProfile(user:UserEntity , firstName:string,lastName,age,phone,gender,country,city,address):Promise<ProfileEntity>{
        let profile = new ProfileEntity();
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.age = age;
        profile.gender = gender;
        profile.phone = phone;
        profile.country = country;
        profile.city = city;
        profile.address = address;
        profile.user = user;  // ForeignKey userId (hgebo mnen ? -> mn function signUp, habasy elUser)
        profile.favorite = await this.createFavList(profile); // ForeignKey (barbotha bel favList)

        return await profile.save();
    }

    async createFavList(profile:ProfileEntity):Promise<FavoriteList>{
        const favList = new FavoriteList();
        favList.profile = profile;
        favList.tracks = [];
        return await favList.save(); // msh htsht8l 8er lma t3ml extends BaseEntity
    }


    //-------------------------------------------------------//

    async signIn(loginData:loginDTO): Promise<{token:string,user:UserEntity}>{
        // Note : e3mlhaa bel tare2a el3adya zy express bzbtt 3adyy
        const {email , user} = await this.userRepository.checkUserLogin(loginData); // Note , Nooooooooooooote
        // Note: el checkUserLogin() lw fe haga 8llt, hy3ml throw le exception , w hy3ml return 
        // ba2y elCode da msh hykml ,, mfeesh token hyt3ml w kda ..

        const payload:JwtPayload = {email};

        const token = this.jwtService.sign(payload); // in express -> jwt.sign({id:user._id,admin:user.isAdmin} , process.env.SECRET_KEY);
        // hygeeb el SecretKey mnen ?  fe elAuthModule m3mool -> JwtModule.register({secret:process.env.SECRET_KEY})

        return {token,user};

        // Try to login 8llt w shoof hytl3lk eh
    }

    async signInAdmin(loginData:loginDTO): Promise<{token:string,user:UserEntity}>{
        // Note : e3mlhaa bel tare2a el3adya zy express bzbtt 3adyy
        const {email , user} = await this.userRepository.checkAdminLogin(loginData); // Note , Nooooooooooooote
        // Note: el checkUserLogin() lw fe haga 8llt, hy3ml throw le exception , w hy3ml return 
        // ba2y elCode da msh hykml ,, mfeesh token hyt3ml w kda ..

        const payload:JwtPayload = {email};

        const token = this.jwtService.sign(payload); // in express -> jwt.sign({id:user._id,admin:user.isAdmin} , process.env.SECRET_KEY);
        // hygeeb el SecretKey mnen ?  fe elAuthModule m3mool -> JwtModule.register({secret:process.env.SECRET_KEY})

        return {token,user};

        // Try to login 8llt w shoof hytl3lk eh
    }


    async getUserData(user:UserEntity) :Promise<{user:UserEntity , profile:ProfileEntity, favList:FavoriteList}>{
        const profile = await this.profileService.getProfileData(user);
        const favList = await this.favListService.getUserFavList(profile.favoriteId);
        return {
            user,
            profile,
            favList
        }
    }

    async getAllSystemUsers() :Promise<UserEntity[]>{
        return await this.userRepository.find();
    }

    async getUserById(userId:number) :Promise<UserEntity>{
        const user = await this.userRepository.findOneBy({id:userId});
        if(!user) throw new NotFoundException('user not found');
        return user; 
    }

    async setAdmin(userId:number) :Promise<UserEntity>{
        const user = await this.getUserById(userId); // msh h3ml handle exception b2a 3shan 3amlo fo2
        if(user.roles.includes(Role.ADMIN)) throw new BadRequestException('user is already set to Admin'); // statusCode 400
        user.roles.push(Role.ADMIN);
        return await user.save();
    }

    async deleteUserAccount(user:UserEntity) :Promise<void>{
        // 1- lazem tgeeb el profileId elAwl w el favId , leeh ?? , mnadehom 3ltol t7t ?
        //    => lazemm 3shan lma ams7 elUser , msh hyb2a fe asln user.profileId
        // 2- tb leh 3mlt getProfile ? -> 3shan elUser msh byreturn el favId , lazem agbha mn el profile

        // console.log(user);
        const profileId = user.profileId;
        const favId = (await this.profileService.getProfileData(user)).favoriteId; // Call Immediately and get result
        console.log(profileId , favId);

        // procedure 1
        for(let i=0; i<user.playlists.length; i++){
            await this.playlistService.deletePlaylist(user.playlists[i].id);
        }

        // procedure 2
        await this.userRepository.delete(user.id);

        // procedure 3
        await this.profileService.deleteProfile(user.profileId);

        // procedure 4
        await this.favListService.deleteFavlist(favId);

    }


}