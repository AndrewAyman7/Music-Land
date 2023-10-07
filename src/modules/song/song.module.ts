import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { TrackModule } from '../track/track.module';
import { FavoriteService } from '../fav/fav.service';
import { FavModule } from '../fav/fav.module';
import { PassportModule } from '@nestjs/passport';
import { PlaylistModule } from '../playlist/playlist.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Song]),
        FavModule,
        PlaylistModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        TrackModule
    ],
    controllers: [SongController],
    providers: [SongService , SongRepository]
})
export class SongModule {}
