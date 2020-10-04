import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useSignInMutation } from 'lib/graphql/signin.graphql';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function SignIn() {
  const classes = useStyles();
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
      if (data.login.user) {
        client.resetStore().then(() => {
          router.push('/');
        });
      }
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={onSubmit}>
          {errorMsg && <p>{errorMsg}</p>}
          <Typography variant="h4" className={classes.title}>
            Sign In
          </Typography>
          <div className="form-group">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              label="Email"
            />
          </div>
          <div className="form-group">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              label="Password"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.margin}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));
