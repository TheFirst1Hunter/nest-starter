import { Post as PrismaPost } from '@prisma/client';
import { User } from '../../user/entities/user.entity';

export class Post implements PrismaPost {
  id: string;
  title: string;
  userId: string;
  author: User;
  content: string;
}
