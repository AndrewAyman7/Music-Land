import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteList } from './favorite.entity';
import { PassportModule } from '@nestjs/passport';
import { FavoriteController } from './fav.controller';
import { FavoriteService } from './fav.service';
import { TrackModule } from '../track/track.module';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([FavoriteList]),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        TrackModule
    ],
    controllers : [FavoriteController],
    providers : [FavoriteService],
    exports : [FavoriteService]
})
export class FavModule {}
