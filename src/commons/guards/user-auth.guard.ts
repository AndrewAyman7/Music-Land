import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../enums/role.enum";
import { UserEntity } from "src/modules/auth/entities/user.entity";

@Injectable()
export class UserAuthGuard implements CanActivate{ // koll elCode da gahez
    constructor(private readonly reflector:Reflector){} // elReflector bygeeb el @Decorators mn el Controllers

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> { // execuitonContext: by2dr ya5od el Request
        const roles = this.reflector.get<Role[]>('roles',context.getHandler()); // as roles
        console.log(roles);

        if(!roles){ // lw elRequest ely gayly mlhoosh role asln , masheeh mtkmlsh
            return true;
        }

        const req = context.switchToHttp().getRequest(); // hena elGuard bya5od el Request
        const user:UserEntity = req.user; // b3rf kol haga 3n elUser ely ba3at wl Request , de ely feha kol m3lomat el user (passport,jwt,token)

        if(user){
            const hasRole = ()=> user.roles.some(role => role === Role.USER); // fun , lw el users feha 'USER' -> Return True 
            if(hasRole()) return true;
            else return false;
        }
        

    }
}