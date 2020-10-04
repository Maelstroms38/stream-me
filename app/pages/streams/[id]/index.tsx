import * as React from 'react';
import Hero from 'components/Hero';
import { useStreamQuery, Stream } from 'lib/graphql/stream.graphql';

export default function StreamPage({ id }) {
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

StreamPage.getInitialProps = async ({ query: { id } }) => {
  return {
    id,
  };
};
