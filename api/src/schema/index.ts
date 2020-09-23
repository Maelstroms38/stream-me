import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { ObjectId } from 'mongodb';
import path from 'path';

import { UserResolver } from '../resolvers/UserResolver';
import { ObjectIdScalar } from './object-id.scalar';

// build TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
  return schema;
}
