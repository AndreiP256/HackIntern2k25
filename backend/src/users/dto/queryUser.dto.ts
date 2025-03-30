import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class QueryUserDto {
  @Field({ nullable: true })
  @IsString()
  id?: string;
}
