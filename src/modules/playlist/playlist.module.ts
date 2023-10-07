import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { PlayListRepositpry } from './playlist.repository';
import { PassportModule } from '@nestjs/passport';
import { TrackModule } from '../track/track.module';

@Module({
    imports : [ 
        TypeOrmModule.forFeature([Playlist]),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        TrackModule
     ],
    controllers: [PlaylistController],
    providers : [PlaylistService,PlayListRepositpry],
    exports : [PlaylistService]
})
export class PlaylistModule {}
