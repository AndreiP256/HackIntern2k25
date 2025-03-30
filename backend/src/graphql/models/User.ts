import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

registerEnumType(Role, {
    name: 'Role',
  });
  

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  nume: string;

  @Field()
  prenume: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  role?: string;
}