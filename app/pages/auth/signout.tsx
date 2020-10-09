import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useSignOutMutation } from 'lib/graphql/signout.graphql';

export default function SignOut() {
  // Signing Out
  const [signOutMutation] = useSignOutMutation();
  const client = useApolloClient();
  const router = useRouter();

  useEffect(() => {
    signOutMutation().then(() => {
      localStorage.removeItem('token');
      client.resetStore().then(() => {
        router.push('/');
      });
    });
  }, []);
  return <div>Signout</div>;
}
