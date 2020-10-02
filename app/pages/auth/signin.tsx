import { useState } from 'react';
import Router from 'next/router';
import { useSignInMutation } from '../../lib/graphql/signin.graphql';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signing In
  const [signInMutation] = useSignInMutation({
    async onCompleted({ login }) {
      const { user } = login;
      if (user && user._id) {
        Router.push('/');
      }
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    signInMutation({ variables: { email, password } });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
}
