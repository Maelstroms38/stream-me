import { InputType, Field } from 'type-graphql';

import { Stream } from '../entity/Stream';

@InputType()
export class StreamInput implements Partial<Stream> {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  url: string;
}
