import { Gender } from "src/commons/enums/gender.enum";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserEntity } from "../auth/entities/user.entity";
import { FavoriteList } from "../fav/favorite.entity";

@Entity('profiles') // Table in DB
@Unique(['phone'])
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({
        type:'enum',
        enum:Gender,
        array:false
    })
    gender:Gender;

    @Column()
    age:number;

    @Column({nullable:true})
    image:string;

    @Column()
    country:string;

    @Column()
    city:string;

    @Column()
    address:string;

    @Column()
    phone:string;

    @OneToOne(type=>UserEntity , user=> user.profile) // gwa elUserEntity feeh field gdeed h3mlo esmo profile:ProfilrEntity ,
    user:UserEntity;

    @OneToOne(type => FavoriteList , fav => fav.profile)
    @JoinColumn() // 3shan a5le el foreign key hena ,, lma ageeb elProfile ykoon feeh FK lel FavList , 2 a7oto b3d kda fe el favId
    favorite:FavoriteList; // hy3mlk By def : favoriteid ForeignKey

    // kda elForeignKey hyb2a fe table el Profile , y3ni table elFavorite msh hyb2a feeh profileId , just id 

    @Column()
    favoriteId:number;
}