import { Auth } from 'src/commons/classes/auth';
import { Role } from 'src/commons/enums/role.enum';
import {Entity , PrimaryGeneratedColumn , Column, Unique, OneToOne, JoinColumn, OneToMany, BaseEntity} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ProfileEntity } from 'src/modules/profile/profile.entity';
import { Playlist } from 'src/modules/playlist/playlist.entity';

@Entity('users') // Table users
@Unique(['username' , 'email'])
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn() // PK
    id:number;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    salt:string; // random string added to password , 3shan yb2a est7ala 7d yktshfo , Geneated by bcrybt

    @Column({
        type:'enum',
        enum:Role,
        array:true
    })
    roles:Role[]; // admin + user msln

    @Column('simple-json') // Type Json (Postgre support json type)
    auth:Auth; // class object

    // Methods
    // msh lazem tktbha hena , e3mlha hya w elLogic bta3ha fe el UserRepoistory a7sn
    async validatePassword(pass) : Promise<boolean>{  // Return Promise -> 3shan  from DB
        const hashedPass = await bcrypt.hash(pass,this.salt);
        return this.password === hashedPass;
    }

    // Validations ..

    @OneToOne(type => ProfileEntity  ,  p => p.user) // arbot b anhy table elAwl && b3d ma rabatt b2a 3ayez anhy field
                                                     //gwa ProfileEntity fe field gdeed h3mlo esmo user:UserEntity, da ely h3ml m3ah elRelation
    @JoinColumn() // lel Table ely 3ayez a7ot 3ndo Foreign Key (profileId)
    profile:ProfileEntity;

    @OneToMany(type => Playlist , p => p.user)
    playlists:Playlist[];

    @Column()  // Foreign Key
    profileId:number;
}

/*
getUsers():Promise<User[]>{  // elReturn type mlhash lazma in this case , kda kda btrg3 bel fields hya hya
        return this.userRepository.find()
}
*/