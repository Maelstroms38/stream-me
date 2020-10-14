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
import { twilio } from '../middleware/twilio';

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(twilio)
  async stream(
    @Arg('streamId', () => ObjectIdScalar) streamId: ObjectId,
    @Ctx() ctx: MyContext
  ) {
    const stream = await StreamModel.findById(streamId);
    stream!.token = ctx.res.locals.token;
    return stream;
  }

  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  streams(@Ctx() ctx: MyContext) {
    return StreamModel.find({ author: ctx.res.locals.userId });
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(
    @Arg('input') streamInput: StreamInput,
    @Ctx() ctx: MyContext
  ): Promise<Stream> {
    const stream = new StreamModel({
      ...streamInput,
      author: ctx.res.locals.userId,
    } as Stream);

    await stream.save();

    return stream;
  }

  @FieldResolver()
  async author(@Root() stream: Stream): Promise<User | null> {
    return await UserModel.findById(stream.author);
  }
}
