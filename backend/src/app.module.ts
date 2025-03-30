import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GraphqlModule, UserModule, AuthModule],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
