import { IsEmail, IsString , Length} from "class-validator";

export class UserAuthDto{

    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    @Length(6,50)
    password:string;
}