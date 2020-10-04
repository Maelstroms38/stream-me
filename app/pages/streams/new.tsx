import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useCreateStreamMutation } from 'lib/graphql/createStream.graphql';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function CreateStream() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const router = useRouter();

  // Signing In
  const [createStream] = useCreateStreamMutation();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createStream({
        variables: { input: { title, description, url } },
      });
      if (data.addStream._id) {
        router.push('/streams');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={onSubmit}>
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Title"
            helperText="Give a short title to the new Stream"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Description"
            helperText="Give a description to the new Stream"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="URL"
            helperText="Give a URL to the new Stream"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Create Stream
          </Button>
        </form>
      </Box>
    </Container>
  );
}
