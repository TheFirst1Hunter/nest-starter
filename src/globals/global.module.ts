import { Global, Module } from '@nestjs/common';
import { globalProviders } from './globals.types';
import { PrismaService } from '../prisma.service';

@Global()
@Module({
  providers: [{ provide: globalProviders.prisma, useValue: PrismaService }],
  exports: [globalProviders.prisma],
})
export class PrismaModule {}
