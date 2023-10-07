import { IsString , IsNumber , Min, IsEmail, Length} from "class-validator";
import { Gender } from "src/commons/enums/gender.enum";

export class CreateUserProfileDto {

    @IsString()
    firstName:string;

    @IsString()
    lastName:string;

    @IsNumber()
    @Min(5 , {message:'sorry baby, min age is 5 years'})
    age:number;

    @IsString()
    phone:string;

    gender:Gender;

    @IsString()
    country:string;

    @IsString()
    city:string;

    @IsString()
    address:string

    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    @Length(6,50)
    password:string;
    
}