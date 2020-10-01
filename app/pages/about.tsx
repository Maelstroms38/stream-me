import React from 'react';
import Container from '@material-ui/core/Container';

import Navigation from '../components/Navigation';
import Posts from '../components/Posts';

import { initializeApollo } from '../lib/apollo';
import {
  useStreamsQuery,
  StreamsDocument,
  Stream,
} from '../lib/streams.graphql';

export default function About() {
  const { data, loading } = useStreamsQuery();
  return (
    <React.Fragment>
      <Navigation title={'About'} />
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
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
