import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserEntity } from '../entities/user.entity';
import { JwtPayload } from '../../../commons/interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';

// JwtStrategy :
// sho8lto eno yst2bl el Token mn elHeader , w yt3amel m3ah
// 5odo Copy Paste mn Nest Doc
// Lazem be nfs asamy elFunctions w kdaa
// elPassport mstny mnk function validate de 
// 3shan ysht8l lazem t7oto fe elProviders fe elModule

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload;
    //console.log(payload);
    //console.log(email);
    const user = await this.userRepository.findOneBy({email})
    if (!user) {
      throw new UnauthorizedException('User Is Not Authorized');
    }
    return user;
  }
}