import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSignInMutation } from '../../lib/graphql/signin.graphql';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  // Signing In
  const [signInMutation] = useSignInMutation();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await signInMutation({ variables: { email, password } });
      if (data.login.user) {
        router.push('/');
      }
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {errorMsg && <p>{errorMsg}</p>}
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
