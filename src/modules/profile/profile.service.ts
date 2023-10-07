import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileEntity } from "./profile.entity";
import { DeleteResult, Repository } from "typeorm";
import { UserEntity } from "../auth/entities/user.entity";
import { CreateUserProfileDto } from "../auth/dtos/create-user-profile.dto";
import * as fs from 'fs';

@Injectable()
export class ProfileService{
    constructor(@InjectRepository(ProfileEntity) private profileRepository:Repository<ProfileEntity>){ }

    async getProfileData(user:UserEntity) :Promise<ProfileEntity>{
        const profile = await this.profileRepository.findOneBy({id:user.profileId});
        // console.log(profile)
        if(!profile) throw new NotFoundException('profile not exist');
        return profile;
    }

    async editProfile(user:UserEntity , profileData:CreateUserProfileDto) :Promise<ProfileEntity>{
        const profile = await this.getProfileData(user);
        const {firstName,lastName,age,address,gender,country,city,phone} = profileData;

        if(firstName) profile.firstName = firstName;
        if(lastName) profile.lastName = lastName;
        if(age) profile.age = age;
        if(gender) profile.gender = gender;
        if(phone) profile.phone = phone;
        if(country) profile.country = country;
        if(city) profile.city = city;
        if(address) profile.address = address;

        return await profile.save();
    }

    async setProfileImg(user:UserEntity, image:string) :Promise<ProfileEntity>{
        const profile = await this.getProfileData(user);
        if(image){
            //console.log(image)
            profile.image = image;   
        }
        return await profile.save();
    }

    async changeProfileImg(user:UserEntity, image:string) :Promise<ProfileEntity>{
        const profile = await this.getProfileData(user);
        if(image){
            //console.log(profile.image)
            fs.unlink(profile.image, (err)=>{ err? console.error(err) : null});
            profile.image = image;   
        }
        return await profile.save();
    }

    async deleteProfileImg(user:UserEntity) :Promise<ProfileEntity>{
        let profile:any = {};
        if(user) profile = await this.getProfileData(user); // 3shan lw elUser mb3tsh asln el userId , elServer by2of, fa handltha
        if(!profile.image){
            throw new ConflictException('image is not exist'); 
        }
        fs.unlink(profile.image , (err)=>{ err? console.error('cannot delete photo from fileSystem') : null});
        return await profile.save();
    }

    async deleteProfile(id:number):Promise<DeleteResult>{
        const deletedProfile = await this.profileRepository.delete(id);
        if(deletedProfile.affected === 0 ) throw new NotFoundException('profile not found');
        return deletedProfile;
    } 
}
