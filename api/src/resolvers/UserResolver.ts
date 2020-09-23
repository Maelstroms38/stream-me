import { Resolver, Query, Ctx } from 'type-graphql';

import { MyContext } from '../types/MyContext';
import { User, UserModel } from '../entity/user';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const userId = ctx.req.session?.userId;
    if (userId) {
      const user = await UserModel.findById(userId);
      return user!;
    }
    throw new Error('User not found');
  }
}
