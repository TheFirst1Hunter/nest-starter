import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaClient);
    create(createUserDto: CreateUserDto): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
