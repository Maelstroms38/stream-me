import * as React from 'react';
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
    const videoJsOptions = {
      controls: true,
      sources: [
        {
          src: data.stream.url,
          type: 'video/mp4',
        },
      ],
    };
    return (
      <React.Fragment>
        <Hero stream={data.stream as Stream} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Video {...videoJsOptions} />
        </div>
      </React.Fragment>
    );
  }

  return null;
}
