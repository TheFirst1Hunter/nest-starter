import { Global, Module } from '@nestjs/common';
import { globalProviders } from './globals.types';
import { PrismaService } from '../misc/prisma.service';

@Global()
@Module({
  providers: [
    { provide: globalProviders.prisma, useValue: new PrismaService() },
  ],
  exports: [globalProviders.prisma],
})
export class PrismaModule {}
