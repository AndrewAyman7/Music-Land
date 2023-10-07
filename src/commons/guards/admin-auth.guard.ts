import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../enums/role.enum";
import { UserEntity } from "src/modules/auth/entities/user.entity";

@Injectable()
export class AdminAuthGuard implements CanActivate{ // koll elCode da gahez
    constructor(private readonly reflector:Reflector){} // elReflector bygeeb el @Decorators mn el Controllers

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>('roles',context.getHandler()); // as roles

        if(!roles){ // lw elRequest ely gayly mlhoosh role asln , masheeh mtkmlsh
            return true;
        }

        const req = context.switchToHttp().getRequest(); // hena elGuard bya5od el Request
        const admin:UserEntity = req.user; // de ely feha kol m3lomat el user (passport,jwt,token)

        if(admin){
            const hasRole = ()=> admin.roles.some(role => role === Role.ADMIN); // fun , lw el users feha 'USER' -> Return True 
            if(hasRole()) return true;
            else return false;
        }
        

    }
}
/*
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { UserEntity } from '../../modules/auth/entities/user.entity';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const admin: UserEntity = req.user;
    if (admin) {
      const hasRole = () => admin.roles.some(role => role === Role.ADMIN);
      return hasRole();
    } else {
      return false;
    }

  }
}*/