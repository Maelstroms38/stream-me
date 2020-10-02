import React from 'react';
import Container from '@material-ui/core/Container';

import Posts from '../components/Posts';

import { initializeApollo } from '../lib/apollo';
import {
  useStreamsQuery,
  StreamsDocument,
  Stream,
} from '../lib/graphql/streams.graphql';

export default function About() {
  const { data, loading } = useStreamsQuery({
    variables: { userId: '5f6cf671b28bda7a3d6e52d1' },
  });
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        {!loading && data && data.streams && (
          <Posts streams={data.streams as Stream[]} />
        )}
      </Container>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: StreamsDocument,
    variables: { userId: '5f6cf671b28bda7a3d6e52d1' },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
