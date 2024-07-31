import React, { ReactNode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:3000/devices',
  cache: new InMemoryCache(),
})

interface ApolloProviderProps {
  children: ReactNode
}

const ApolloProviderComponent: React.FC<ApolloProviderProps> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloProviderComponent
