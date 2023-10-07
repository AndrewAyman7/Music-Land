import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "../profile/profile.entity";
import { Track } from "../track/track.entity";

@Entity('favorite-list')
export class FavoriteList extends BaseEntity{ // Lazem BaseEntity 3shan elMethods ( falList.save() )
    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(type => ProfileEntity , profile => profile.favorite)
    profile:ProfileEntity;

    @OneToMany(type => Track , t => t.favoriteList , {eager:true})
    tracks:Track[]; // htroo7 lel Tracks table w tgeeb elTracks ely elFavId bta3tha = el favloriteList de
}