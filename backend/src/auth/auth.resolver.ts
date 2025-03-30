import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/authInput.dto';
import { AuthResponse } from './dto/authResponse.dto';
import { RegInput } from './dto/regInput.dto';
import { User } from 'src/graphql/models/User';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('authInput') authInput: AuthInput) {
    const user = await this.authService.validateUser(
      authInput.email,
      authInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Mutation(() => User)
  async register(@Args('regInput') regInput: RegInput) {
    return this.authService.register(regInput);
  }
}
