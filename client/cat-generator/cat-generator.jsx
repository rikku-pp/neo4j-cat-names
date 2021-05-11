import React, { useState, useContext, useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { CountryContext } from '../contexts'
import { CatName } from '../cat-name'
import Query from './cat-generator-query.graphql'

export const CatGenerator = () => {
  const [skipList, setSkipList] = useState([])
  const { selected: countries, available: allCountries } = useContext(
    CountryContext
  )
  const [generate, { loading, error, data }] = useLazyQuery(gql(Query), {
    fetchPolicy: 'network-only'
  })

  const onClick = () => {
    generate({
      variables: {
        countries: countries.length ? countries : allCountries,
        skipList
      }
    })
  }

  const catName = data?.CatNameV3?.name

  useEffect(() => catName && setSkipList(skipList.concat([catName])), [data])

  return (
    <>
      <style>{`
        .cat-generator-layout {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cat-generator {
          margin-top: 0.5rem;
          flex-direction: row;
          align-items: center;
        }
        .cat-generator .mdl-spinner {
          color: white;
        }
      `}</style>
      <div className="cat-generator-layout">
        <div>
          Welcome to the world of cat names! It's so nice to have you. Please go
          ahead and shuffle pick the name of your new cat or kitten. You may
          also learn something about the name!
        </div>
        <div className="cat-generator-layout cat-generator">
          <button
            onClick={onClick}
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Find a cat name
          </button>
          <div
            className={`mdl-spinner mdl-js-spinner ${
              loading ? 'is-active' : ''
            }`}></div>
          <div style={{ display: loading ? 'none' : 'inline-block' }}>
            {(error && 'Error: ' + error.message) || <CatName name={catName} />}
          </div>
        </div>
      </div>
    </>
  )
}
