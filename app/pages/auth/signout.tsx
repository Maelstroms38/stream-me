import { useEffect } from 'react';
import Router from 'next/router';
import { useSignOutMutation } from '../../lib/graphql/signout.graphql';

export default function SignOut() {
  // Signing Out
  const [signOutMutation] = useSignOutMutation({
    async onCompleted() {
      Router.push('/');
    },
  });
  useEffect(() => {
    signOutMutation();
  }, []);
  return <div>Signout</div>;
}
