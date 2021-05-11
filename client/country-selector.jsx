import React, { useContext } from 'react'

import { CountryContext, countryInfo } from './contexts'
import { AddButton } from './add-button'

export const CountrySelector = () => {
  const { available = [], selected = [], select, deselect } = useContext(
    CountryContext
  )

  return (
    <>
      <style>
        {`
          .mdl-chip { margin:0; }
          .mdl-card__actions{
            display: flex;
            align-items: center;
            overflow-x: auto;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .mdl-card__actions::-webkit-scrollbar {
            display: none;
          }
          .mdl-button--fab.mdl-button--mini-fab{
            margin: 0 0.5rem;
            width: 32px; 
            height: 32px;
            min-width: 32px;
            margin-top: -2px;
          }
          .mdl-chip__contact{
            box-sizing: border-box;
            border: 2px solid grey;
          }
          .menu-reposition > .mdl-menu__container {
            right: 0;
            left: unset !important;
          }
        `}
      </style>
      <div className="mdl-card__actions mdl-card--border">
        {selected.map((key) => (
          <span
            key={key}
            className="mdl-chip mdl-chip--contact mdl-chip--deletable">
            <img
              alt={`flag for ${key}`}
              className="mdl-chip__contact"
              src={`${countryInfo[key].flagSrc}`}
            />
            <span className="mdl-chip__text">{countryInfo[key].name}</span>
            <button
              className="mdl-chip__action"
              tabIndex="-1"
              name={key}
              onClick={(e) => deselect(e.currentTarget.name)}>
              <i className="material-icons" role="button" tabIndex="0">
                cancel
              </i>
            </button>
          </span>
        ))}

        <AddButton
          emptyState={!selected.length}
          show={available.length}
          description="Country selection"
          id="country-add"
        />

        <div className={selected.length > 1 ? 'menu-reposition' : ''}>
          <ul
            htmlFor="country-add"
            className={`mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect`}>
            {available.map((key) => (
              <li
                className="mdl-menu__item"
                role="link"
                tabIndex="-1"
                key={key}
                onClick={() => select(key)}>
                {countryInfo[key].name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
