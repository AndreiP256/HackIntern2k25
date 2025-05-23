import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserService } from 'src/users/users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15d' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    UserService,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
