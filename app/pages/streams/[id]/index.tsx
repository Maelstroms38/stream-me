import Container from '@material-ui/core/Container';

import Hero from 'components/Hero';
import Content from 'components/Content';
import { useStreamQuery, Stream } from 'lib/graphql/stream.graphql';

export default function StreamDetail({ id }) {
  const { data, loading } = useStreamQuery({
    variables: { streamId: id },
  });

  if (!loading && data && data.stream) {
    return (
      <Container maxWidth="lg">
        <Hero stream={data.stream as Stream} />
        <Content url={data.stream.url} />
      </Container>
    );
  }

  return null;
}

StreamDetail.getInitialProps = ({ query: { id } }) => {
  return { id };
};
