import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { compareSync } from "bcryptjs";

// Fetch the user after he logged in
// el ExecutionContext hwa ely by Access el Request w ya5od mno elData bta3et elUser 

// Explain :
// ana 3ayz lma elUser y3ml login, elData bta3to tkoon m3aya fe koll elSaf7at (kol elRequests)
// 3ayzo yt7rk bel Data bta3to fe el mwk3 ..
// Param Decorator : @getAuthenticatedUser() ..
// h3mlo w adeeh le koll EndPoint fe elController ..
// elUser hy3ml login fa elData bta3to htb2a fe el req.user
// ana 3ayz b2a lma elUser y3ml login ywdeh 3l Profile bta3o msln
// mn elA5er 3ayz msln getProfileById() , bs el id ykoon mn elToken (req.user)
// fa 3mlt decorator ygeeb elUser mn elRequest w elDecorator = Param
// @getAuthenticatedUser() ana ely 3amlha

export const getAuthenticatedUser = createParamDecorator(
    (data:any , context:ExecutionContext)=>{  // Arrow Fun
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        // console.log(user); // user
        return user;
    }
);