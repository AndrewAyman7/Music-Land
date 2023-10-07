import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports : [ 
        TypeOrmModule.forFeature( [ProfileEntity] ) ,
        PassportModule.register({
            defaultStrategy: 'jwt',
        })
    ],
    controllers : [ProfileController],
    providers : [ProfileService],
    exports : [ProfileService]
})
export class ProfileModule {}
