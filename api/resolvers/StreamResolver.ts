import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Ctx,
  Arg,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { ObjectId } from 'mongodb';
import { MyContext } from '../types/MyContext';
import { User, UserModel } from '../entity/User';
import { Stream, StreamModel } from '../entity/Stream';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { StreamInput } from '../types/StreamInput';
import { isAuth } from '../middleware/isAuth';

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  stream(@Arg('streamId', () => ObjectIdScalar) streamId: ObjectId) {
    return StreamModel.findById(streamId);
  }

  @Query(() => [Stream])
  streams() {
    return StreamModel.find({});
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(
    @Arg('input') streamInput: StreamInput,
    @Ctx() ctx: MyContext
  ): Promise<Stream> {
    const stream = new StreamModel({
      ...streamInput,
      author: ctx.req.session?.userId,
    } as Stream);

    await stream.save();

    return stream;
  }

  @FieldResolver()
  async author(@Root() stream: Stream): Promise<User | null> {
    return await UserModel.findById(stream.author);
  }
}