import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicAlbum } from './music-album.entity';
import { MusicAlbums } from './music-album.controller';
import { MusicAlbumService } from './music-album.service';

import { PassportModule } from '@nestjs/passport';

// Lazemm 3shan tst5dm el .env
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [TypeOrmModule.forFeature([MusicAlbum]) , PassportModule.register( {defaultStrategy:process.env.STRATEGY} ) ],
    controllers: [MusicAlbums],
    providers : [MusicAlbumService]
})
export class MusicAlbumModule {}
