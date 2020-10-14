import * as React from 'react';
import Container from '@material-ui/core/Container';
import Hero from 'components/Hero';
import Video from 'components/Video';
import { useRouter } from 'next/router';
import { useStreamQuery, Stream } from 'lib/graphql/stream.graphql';

export default function StreamDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useStreamQuery({
    variables: { streamId: id },
  });

  if (!loading && data && data.stream) {
    return (
      <Container maxWidth="lg">
        <Hero stream={data.stream as Stream} />
        <Video url={data.stream.url} />
      </Container>
    );
  }

  return null;
}
