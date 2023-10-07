import { DataSource, EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import { Role } from "src/commons/enums/role.enum";
import { loginDTO } from "../dtos/login.dto";
import * as bcrypt from 'bcryptjs';  // @types/bcryptjs

@Injectable()
export class UserRepository extends Repository<UserEntity>{

    constructor( private dataSource:DataSource ){
        super(UserEntity, dataSource.createEntityManager());
    }

    async findUserByEmail(email:string):Promise<UserEntity> { // ay haga btrg3 mn elDB = Promise , mmkn mtktbhash lw 3ayz (elReturn Type)
        return await this.findOneBy({email}); // this = this Class : UserRepository Class
        // or
        /*
            const user = await this.userRepository.findOne(
                { where: { email: email} }
            );
        */
    }

    async findUserByName(username:string): Promise<UserEntity> {
        return await this.findOneBy({username}); // return the user if exist ,, return null if not exist
    }

    async checkUserLogin(loginDTO:loginDTO) : Promise<{email:string, user:UserEntity}>{
        const {email,password} = loginDTO;
        const user = await this.findUserByEmail(email);
        if(!user){
            throw new NotFoundException("User Not Found");
        }
        if( (await user.validatePassword(password)) ){ // bnady el validatePassword bel user 5ale balak
            return {email,user};
        }else{
            throw new BadRequestException('Password is not correct');
        }

        // Note: e3ml elValidatePassword hena a7snnnn , elUser m3ak aho , hat elPassword bta3o w hash elPassword bta3 elInput w Compare
    }

    async checkAdminLogin(loginDTO:loginDTO) : Promise<{email:string, user:UserEntity}>{
        const {email,password} = loginDTO;
        const user = await this.findUserByEmail(email);
        if(!user){
            throw new NotFoundException("User Not Found");
        }
        const isAdmin = ():Boolean  => user.roles.some(role => role === Role.ADMIN);  // CB Function
        if(!isAdmin()){
            throw new ForbiddenException('You Are Not Authorized, Admin only');
        }
        if( (await user.validatePassword(password)) ){
            return {email,user};
        }else{
            throw new BadRequestException('Password is not correct');
        }
    }

    async hashPassword(password,salt:string):Promise<string>{
        return await bcrypt.hash(password,salt); // 5odly elPassword w elSalt string w e3mlhom hash swa
    }

    // Note: elTaree2a de lel Repository ->  Deprecated .. "adeema"
    // the new way ..
    /*
        import { UserEntity } from "../entities/user.entity";

        const userRepository = dataSource.getRepository(UserEntity);
        const user = await userRepository.findOneBy( {id: 1} );

    */


}
