import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString, Validate } from 'class-validator';
import { Role } from '@prisma/client';

class IsNotEmptyValidator {
  validate(object: any) {
    return Object.values(object).some(
      (value) => value !== null && value !== undefined,
    );
  }
}

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsString()
  @Validate(IsNotEmptyValidator)
  readonly nume: string;

  @Field({ nullable: true })
  @IsString()
  @Validate(IsNotEmptyValidator)
  readonly prenume: string;

  @Field({ nullable: true })
  @IsEmail()
  @Validate(IsNotEmptyValidator)
  readonly email: string;

  @Field({ nullable: true })
  @IsString()
  @Validate(IsNotEmptyValidator)
  readonly password: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Role, { nullable: true })
  @Validate(IsNotEmptyValidator)
  readonly role?: Role;
}
