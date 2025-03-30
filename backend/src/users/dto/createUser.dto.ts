import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly nume: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Role, { nullable: true })
  @IsString()
  @IsOptional()
  readonly role?: Role;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly prenume: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
