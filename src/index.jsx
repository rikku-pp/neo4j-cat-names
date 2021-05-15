import React from 'react'
import { render } from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { CatGenerator } from './cat-generator'
import { CountryContextProvider } from './contexts'
import { Layout } from './layout'
import { ENDPOINT } from './utils'

const client = new ApolloClient({
  uri: ENDPOINT,
  cache: new InMemoryCache()
})

console.log('ENDPOINT ', ENDPOINT)

function App() {
  return (
    <ApolloProvider client={client}>
      <CountryContextProvider>
        <Layout>
          <CatGenerator />
        </Layout>
      </CountryContextProvider>
    </ApolloProvider>
  )
}

render(<App />, document.getElementById('root'))
