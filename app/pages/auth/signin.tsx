import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useSignInMutation } from 'lib/graphql/signin.graphql';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();
  const client = useApolloClient();

  // Signing In
  const [signInMutation] = useSignInMutation();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await signInMutation({ variables: { email, password } });
      if (data.login.token) {
        localStorage.setItem('token', data.login.token);
        client.resetStore().then(() => {
          router.push('/');
        });
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={onSubmit}>
          {errorMsg && <p>{errorMsg}</p>}
          <Typography variant="h4">Sign In</Typography>
          <Box pb={2.5} />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            label="Email"
            required
          />
          <Box pb={2.5} />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            label="Password"
            required
          />
          <Box pb={2.5} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}
