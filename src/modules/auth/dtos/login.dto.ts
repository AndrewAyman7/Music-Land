import { IsEmail, IsString, Length } from "class-validator";

export class loginDTO {

    @IsEmail()
    email:string;

    @Length(6,50)
    password:string;
}