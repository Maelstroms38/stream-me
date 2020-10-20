import { InputType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Stream } from '../entity/Stream';

@InputType()
export class StreamInput implements Partial<Stream> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  url: string;
}
