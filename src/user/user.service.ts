import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginObject } from './user.types';
import { SignInDTO, LoginDTO } from './dto';
import { globalProviders } from '../globals/globals.types';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(globalProviders.prisma) private prisma: PrismaClient,
  ) {}
  async signIn(signInDTO: SignInDTO): Promise<LoginObject> {
    const salt = await genSalt();

    signInDTO.password = await hash(signInDTO.password, salt);

    const user = await this.prisma.user.create({ data: signInDTO });

    const { password, ...userWithoutPassword } = user;

    const loginObject: LoginObject = {
      data: userWithoutPassword,
      accessToken: this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME,
        },
      ),
      refreshToken: this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME,
        },
      ),
    };

    return loginObject;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { username } });
  }

  async validateUser(loginDTO: LoginDTO): Promise<LoginObject> {
    const user = await this.findOneByUsername(loginDTO.username);

    if (!user) {
      throw new HttpException('no such a username', HttpStatus.BAD_REQUEST);
    }

    if (!(await compare(loginDTO.password, user.password))) {
      throw new HttpException(
        'wrong password or username',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password, ...userWithoutPassword } = user;

    const loginObject: LoginObject = {
      data: userWithoutPassword,
      accessToken: this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME,
        },
      ),
      refreshToken: this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME,
        },
      ),
    };

    return loginObject;
  }
}
