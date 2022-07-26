import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { LoginObject } from './user.types';
import { SignInDTO } from './dto';
import { globalProviders } from '../globals/globals.types';

@Injectable()
export class UserService {
  constructor(
    @Inject(globalProviders.prisma) private prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(signInDTO: SignInDTO): Promise<LoginObject> {
    const salt = await bcrypt.genSalt();

    signInDTO.password = await bcrypt.hash(signInDTO.password, salt);

    const user = await this.prisma.user.create({ data: signInDTO });

    const { password, ...userWithoutPassword } = user;

    const loginObject: LoginObject = {
      data: userWithoutPassword,
      accessToken: this.jwtService.sign(user.id, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME,
      }),
      refreshToken: this.jwtService.sign(user.id, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME,
      }),
    };

    return loginObject;
  }
}
