import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musician } from './musician.entity';
import { MusicianRepository } from './musician.repository';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';
import { PassportModule } from "@nestjs/passport"


// Lazemm 3shan tst5dm el .env
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [ 
        TypeOrmModule.forFeature([Musician]),
        PassportModule.register( {defaultStrategy:process.env.STRATEGY} )
    ],
    controllers : [MusicianController],
    providers : [MusicianService, MusicianRepository]
})
export class MusicianModule {}
