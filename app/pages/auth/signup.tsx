import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useSignUpMutation } from 'lib/graphql/signup.graphql';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();
  const client = useApolloClient();

  // Signing Up
  const [signUpMutation] = useSignUpMutation();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await signUpMutation({ variables: { email, password } });
      if (data.register.user) {
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
          <Typography variant="h4">Sign Up</Typography>
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
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}
