import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { globalProviders } from '../globals/globals.types';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(@Inject(globalProviders.prisma) private prisma: PrismaClient) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.findMany();
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
