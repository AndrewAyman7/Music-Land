import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule , TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DBConfig } from './configs/DBConfig';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MusicianModule } from './modules/musician/musician.module';
import { SongModule } from './modules/song/song.module';
import { FavModule } from './modules/fav/fav.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { MusicModule } from './modules/music/music.module';
import { MusicAlbumModule } from './modules/music-album/music-album.module';
import { SingerModule } from './modules/singer/singer.module';
import { SongAlbumModule } from './modules/song-album/song-album.module';
import { TrackModule } from './modules/track/track.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { NodemailerModule} from '@crowdlinker/nestjs-mailer';

@Module({
  imports: [
    ConfigModule.forRoot(), // .env file
    TypeOrmModule.forRoot(DBConfig as TypeOrmModuleOptions), 
    MulterModule.register({ dest: './images' }),
    //MulterModule.register({ dest: './files' }),
    AuthModule, 
    ProfileModule, 
    MusicianModule, 
    SongModule, 
    FavModule, 
    PlaylistModule, 
    MusicModule, 
    MusicAlbumModule, SingerModule, SongAlbumModule, TrackModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
