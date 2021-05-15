import React from 'react'

import { Share } from './share'
import { CountrySelector } from './country-selector'

import blackCat from './assets/Black_Cat_Vector.svg'
import texture from './assets/texture.jpg'

export const Layout = ({ children }) => {
  return (
    <>
      <style>
        {`
        .page {
          position: relative;
          overflow: hidden;
        }
        .container {          
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .page::before {
          content: "";
          position: absolute;
          width: 400vw;
          height: 400vw;
          z-index: -1;
          background: url('${texture}'), #228B2277;
          background-blend-mode: multiply;
          transform:translate(-50%,-50%) rotate(15deg);
        }
        .card-wide.mdl-card {
          box-shadow: 10px 10px 28px 0px rgba(0,0,0, 0.7);
        }
        .card-wide > .mdl-card__title {
          height: 200px;
          background: url('${blackCat}') center / cover;
        }
        .mdl-card__title-text {
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
        }
        .mdl-textfield__input {
          padding-left: 4px;
        }
        `}
      </style>
      <div className="page">
        <div className="container">
          <div className="card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Cat name generator</h2>
            </div>
            <div className="mdl-card__supporting-text">{children}</div>
            <CountrySelector />
            <div className="mdl-card__menu">
              <Share />
            </div>
          </div>
        </div>
        <div
          aria-live="polite"
          aria-atomic="true"
          aria-relevant="text"
          id="cat-snack"
          className="mdl-js-snackbar mdl-snackbar">
          <div className="mdl-snackbar__text"></div>
          <button className="mdl-snackbar__action" type="button"></button>
        </div>
      </div>
    </>
  )
}
