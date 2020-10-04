import * as React from 'react';
import Hero from 'components/Hero';
import { useStreamQuery, Stream } from 'lib/graphql/stream.graphql';

export default function StreamDetail({ id }) {
  const { data, loading } = useStreamQuery({
    variables: { streamId: id },
  });

  if (!loading && data && data.stream) {
    return (
      <React.Fragment>
        <Hero stream={data.stream as Stream} />
      </React.Fragment>
    );
  }

  return null;
}

StreamDetail.getInitialProps = ({ query: { id } }) => {
  return {
    id,
  };
};
