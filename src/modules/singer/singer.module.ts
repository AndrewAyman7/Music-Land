import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Singer } from './singer.entity';
import { SingerRepository } from './singer.repository';
import { SingerController } from './singer.controller';
import { SingerService } from './singer.service';
import { PassportModule } from '@nestjs/passport';

// Lazemm 3shan tst5dm el .env
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [ 
        TypeOrmModule.forFeature([Singer]) ,
        PassportModule.register( {defaultStrategy:process.env.STRATEGY} )
    ], 
    controllers: [SingerController],
    providers: [SingerService,SingerRepository]
}) 
export class SingerModule {}
