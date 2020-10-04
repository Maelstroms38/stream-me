import { useEffect } from 'react';
import Container from '@material-ui/core/Container';

import Posts from 'components/Posts';
import { useStreamsQuery, Stream } from 'lib/graphql/streams.graphql';

export default function Streams() {
  const { data, loading, refetch } = useStreamsQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container maxWidth="lg">
      {!loading && data && data.streams && (
        <Posts streams={data.streams as Stream[]} />
      )}
    </Container>
  );
}
