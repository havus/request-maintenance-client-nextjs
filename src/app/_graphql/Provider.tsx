'use client'

import { ReactNode } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL}/graphql`
});

const wsLink = new GraphQLWsLink(createClient({
  url: `${process.env.NEXT_PUBLIC_GRAPHQL_PUBSUB_SERVER_URL}/subscriptions`,
  // connectionParams: {
  //   authToken: ...,
  // },
}));

export const Provider = ({ children }: { children: ReactNode }) => {
  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
