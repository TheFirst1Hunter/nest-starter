import { User as PrismaUser } from '@prisma/client';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends PrismaUser {}
  }

  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      PORT: number;
      JWT_ACCESS_TOKEN_LIFETIME: string;
      JWT_REFRESH_TOKEN_LIFETIME: string;
    }
  }
}
