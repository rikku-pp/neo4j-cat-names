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

const injectGA = () => {
  if (typeof window == 'undefined') {
    return
  }
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', process.env.GTAG)
}

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <CountryContextProvider>
          <Layout>
            <CatGenerator />
          </Layout>
        </CountryContextProvider>
      </ApolloProvider>
      {process.env.GTAG && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`}
          />
          <script>{injectGA()}</script>
        </>
      )}
    </>
  )
}

render(<App />, document.getElementById('root'))
