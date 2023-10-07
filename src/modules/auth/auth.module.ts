import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt'
import { EmailVerify } from './entities/email-verify.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import { FavModule } from '../fav/fav.module';
import { PlaylistModule } from '../playlist/playlist.module';


// Lazemm 3shan tst5dm el .env
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
        JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: {
            expiresIn: process.env.EXPIRES_IN,
          },
        }),

        TypeOrmModule.forFeature( [UserEntity,EmailVerify,UserRepository] ) ,
        ProfileModule,
        FavModule,
        PlaylistModule

    ],
    controllers : [AuthController],
    providers : [AuthService ,UserRepository , JwtStrategy],
    exports : [AuthService, JwtStrategy, JwtModule, PassportModule]  // exports : 3shan ast5dmhom fe el Modules eltanya
})
export class AuthModule {}
