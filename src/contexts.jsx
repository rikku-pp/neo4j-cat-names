import React, { useState, createContext } from 'react'

export const countryInfo = {
  UK: { name: 'UK' },
  Sweden: { name: 'Sverige' },
  Japan: { name: '日本' },
  Spain: { name: 'España' },
  Thailand: { name: 'ภาษาไทย' }
}
Object.keys(countryInfo).forEach(
  (key) => (countryInfo[key].flagSrc = require(`./assets/${key}.svg`).default)
)

export const CountryContext = createContext({})

export const CountryContextProvider = ({ children }) => {
  const [available, setAvailable] = useState(Object.keys(countryInfo))
  const [selected, setSelected] = useState([])

  return (
    <CountryContext.Provider
      value={{
        available,
        selected,
        select: (key) => {
          setAvailable(available.filter((k) => k !== key))
          setSelected([...selected, key])
        },
        deselect: (key) => {
          setAvailable([...available, key])
          setSelected(selected.filter((k) => k !== key))
        }
      }}>
      {children}
    </CountryContext.Provider>
  )
}
