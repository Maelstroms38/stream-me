import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloProvider } from '@apollo/client';

import { streamsQueryMock, currentUserQueryMock } from 'lib/mocks';

interface ProviderProps {
  useMocks?: boolean;
  client?: any;
}
export const Provider: React.FC<ProviderProps> = ({
  useMocks,
  children,
  client,
}) => {
  if (useMocks)
    return (
      <MockedProvider mocks={[streamsQueryMock, currentUserQueryMock]}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    );
  return (
    <ApolloProvider client={client}>
      <React.Fragment>{children}</React.Fragment>
    </ApolloProvider>
  );
};
