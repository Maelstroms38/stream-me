import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSignUpMutation } from '../../lib/graphql/signup.graphql';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  // Signing Up
  const [signUpMutation] = useSignUpMutation({
    async onCompleted({ register }) {
      const { user } = register;
      if (user && user._id) {
        router.push('/');
      }
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await signUpMutation({ variables: { email, password } });
      if (data.register.user) {
        router.push('/');
      }
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {errorMsg && <p>{errorMsg}</p>}
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
