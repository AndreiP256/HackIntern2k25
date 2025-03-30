import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';

@Module({
  providers: [
    UserResolver,
    UserService,
  ],
  imports: [PrismaModule],
})
export class UserModule {}
