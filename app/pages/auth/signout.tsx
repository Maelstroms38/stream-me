import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

export default function SignOut() {
  // Signing Out
  const client = useApolloClient();
  const router = useRouter();

  useEffect(() => {
    sessionStorage.removeItem('token');
    client.resetStore().then(() => {
      router.push('/');
    });
  }, []);
  return <div>Signout</div>;
}
