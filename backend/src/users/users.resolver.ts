import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { User } from 'src/graphql/models/User';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';
import { UserService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlRolesGuard } from 'src/auth/guard/roles.guard';
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/guard/roles.guard';
import { Role } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(
    @Args('createUserDto') CreateUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(CreateUserDto);
  }


  @UseGuards(GqlAuthGuard)
  @UseGuards(GqlRolesGuard)
  @Roles(Role.ROLE2)
  @Query(() => [User])
  async users(@Args() args: QueryUserDto): Promise<UserWithoutPassword[]> {
    if (args?.id) {
      const user = await this.userService.findOne(args.id);
      return user ? [user] : [];
    }
    return await this.userService.findAll();
  }


  @UseGuards(GqlAuthGuard)
  @UseGuards(GqlRolesGuard)
  @Roles(Role.ROLE2)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    return await this.userService.update(id, updateUserDto);
  }

  @UseGuards(GqlAuthGuard)
  @UseGuards(GqlRolesGuard)
  @Roles(Role.ROLE1)
  @Mutation(() => User)
  async removeUser(@Args('id') id: string): Promise<User> {
    return await this.userService.remove(id);
  }
}
