import { ArtistType } from "../enums/artist-type.enum";
import { Gender } from "../enums/gender.enum";

export class CreateMusicianDTO {
    name:string;
    info:string;
    gender:Gender;
    nationality:string;
    type:ArtistType;
    image:any;
}
