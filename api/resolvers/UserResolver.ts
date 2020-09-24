import { Resolver, Query, Ctx, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { MyContext } from "../types/MyContext";
import { User, UserModel } from "../entity/user";
import { ObjectIdScalar } from "../schema/object-id.scalar";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("userId", () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find({});
  }

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: MyContext): Promise<User | null> {
    const userId = ctx.req.session?.userId;
    if (userId) {
      return await UserModel.findById(userId);
    }
    throw new Error("User not found");
  }
}
