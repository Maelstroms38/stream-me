import { useState } from 'react';
import Router from 'next/router';
import { useSignUpMutation } from '../../lib/graphql/signup.graphql';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signing Up
  const [signUpMutation] = useSignUpMutation({
    async onCompleted({ register }) {
      const { user } = register;
      if (user && user._id) {
        Router.push('/');
      }
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    signUpMutation({ variables: { email, password } });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
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
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
