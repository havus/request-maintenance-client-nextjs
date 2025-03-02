'use client'

import { ReactNode } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export const Provider = ({ children }: { children: ReactNode }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
