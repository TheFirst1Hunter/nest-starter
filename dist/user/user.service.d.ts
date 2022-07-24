import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaClient);
    create(createUserDto: CreateUserDto): import(".prisma/client").PrismaPromise<User[]>;
    findAll(): import(".prisma/client").PrismaPromise<User[]>;
    findOne(id: number): string;
    findOneByUsername(username: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
