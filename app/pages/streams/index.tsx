import React from 'react';
import Container from '@material-ui/core/Container';

import Posts from 'components/Posts';
import { useStreamsQuery, Stream } from 'lib/graphql/streams.graphql';
import { useCurrentUserQuery } from 'lib/graphql/currentUser.graphql';

export default function Streams() {
  const { data: userData } = useCurrentUserQuery({
    errorPolicy: 'ignore',
  });
  const { data, loading } = useStreamsQuery({
    variables: {
      userId: userData && userData.currentUser && userData.currentUser._id,
    },
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
