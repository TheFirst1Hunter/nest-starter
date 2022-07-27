import { Inject } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { JWTPayload } from './types.jwt';
import { globalProviders } from '../globals/globals.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(globalProviders.prisma) private prisma: PrismaClient) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: payload.id } });
  }
}
