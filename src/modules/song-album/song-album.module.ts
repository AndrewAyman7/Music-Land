import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongAlbum } from './song-album.entity';
import { SongAlbums } from './song-album.controller';
import { SongAlbumService } from './song-album.service';

@Module({
    imports: [TypeOrmModule.forFeature([SongAlbum])],
    controllers: [SongAlbums],
    providers: [SongAlbumService]
})
export class SongAlbumModule {}
