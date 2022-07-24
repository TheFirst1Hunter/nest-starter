import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id: string;
  username: string;
  password: string;
}
