import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './music.entity';
import { MusicRepository } from './music.repository';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { PassportModule } from '@nestjs/passport';
import { FavModule } from '../fav/fav.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { TrackService } from '../track/track.service';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([Music]),
        FavModule,
        PlaylistModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        TrackService
    ],
    controllers: [MusicController],
    providers : [MusicService,MusicRepository]
})
export class MusicModule {}
