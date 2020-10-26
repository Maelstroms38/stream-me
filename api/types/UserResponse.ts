import { ObjectType, Field } from 'type-graphql';
import { User } from '../entity/User';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}
