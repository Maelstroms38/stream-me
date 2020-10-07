import * as Factory from 'factory.ts';
import faker from 'faker';
import { MockedResponse } from '@apollo/client/testing';
import {
  Query,
  User,
  StreamsDocument,
  Stream,
} from './graphql/streams.graphql';
import {
  Query as UserQuery,
  CurrentUserDocument,
} from './graphql/currentUser.graphql';

const userMock = Factory.Sync.makeFactory<User>({
  __typename: 'User',
  _id: Factory.each(() => faker.random.hexaDecimal()),
  email: Factory.each(() => faker.internet.email()),
});

const streamMock = Factory.Sync.makeFactory<Stream>({
  __typename: 'Stream',
  _id: Factory.each(() => faker.random.hexaDecimal(24)),
  title: Factory.each(() => faker.random.words()),
  description: Factory.each(() => faker.random.words()),
  url: Factory.each(() => faker.internet.url()),
  author: Factory.each(() => userMock.build()),
});

const streamsQueryMock: MockedResponse<Query> = {
  request: {
    query: StreamsDocument,
  },
  result: {
    data: {
      streams: streamMock.buildList(10),
    },
  },
};

const currentUserQueryMock: MockedResponse<UserQuery> = {
  request: {
    query: CurrentUserDocument,
  },
  result: {
    data: {
      streams: streamMock.buildList(10),
      currentUser: userMock.build(),
    },
  },
};

export { currentUserQueryMock, streamsQueryMock };
