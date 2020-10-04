import * as React from 'react';
import Hero from 'components/Hero';
import {
  useStreamQuery,
  Stream,
  StreamDocument,
} from 'lib/graphql/stream.graphql';
import { StreamsDocument } from 'lib/graphql/streams.graphql';
import { initializeApollo } from 'lib/apollo';

interface Props {
  id: string;
}

export default function StreamPage({ id }: Props) {
  const { data, loading } = useStreamQuery({ variables: { streamId: id } });

  if (!loading && data && data.stream) {
    return (
      <React.Fragment>
        <Hero stream={data.stream as Stream} />
      </React.Fragment>
    );
  }

  return null;
}

export async function getStaticProps({ params: { id } }) {
  // Rehydrate query from the apollo cache
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: StreamDocument,
    variables: { streamId: id },
  });

  return {
    props: {
      id,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({
    query: StreamsDocument,
  });

  const { data } = response;

  const paths =
    data &&
    data.streams &&
    data.streams.map((stream) => `/streams/${stream._id}`);
  return { paths, fallback: false };
}
