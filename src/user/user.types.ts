import { User } from '@prisma/client';

export interface LoginObject {
  accessToken: string;
  refreshToken: string;
  data: Omit<User, 'password'>;
}
