import { UserEntity } from "src/modules/auth/entities/user.entity";
import { ProfileEntity } from "src/modules/profile/profile.entity";
import { Singer } from "src/modules/singer/singer.entity";
import { SingerRepository } from "src/modules/singer/singer.repository";


export const DBConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'music-project',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    entities: [UserEntity, ProfileEntity,Singer], 
    synchronize: true,
    autoLoadEntities:true,
}