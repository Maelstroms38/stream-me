import React from 'react';
import Container from '@material-ui/core/Container';

import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Posts from '../components/Posts';

import { initializeApollo } from '../lib/apollo';
import { useStreamsQuery, StreamsDocument } from '../lib/streams.graphql';

export default function About() {
  const { data, loading } = useStreamsQuery();
  console.log(data);
  return (
    <React.Fragment>
      <Navigation title={'About'} />
      <Container maxWidth="lg">
        <Hero />
        {!loading && data && data.streams && <Posts streams={data.streams} />}
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
