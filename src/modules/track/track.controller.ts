import { Controller, Get } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Track } from "./track.entity";
import { Repository } from "typeorm";

@Controller('tracks')
export class TrackController{
    constructor(@InjectRepository(Track) private trackRepository: Repository<Track>){}

    @Get()
    async getAllTracks() :Promise<Track[]>{
        return await this.trackRepository.find();
    }
}