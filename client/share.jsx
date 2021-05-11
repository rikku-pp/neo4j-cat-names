import React from 'react'

import * as sharing from 'vanilla-sharing'
import worldCat from './assets/world_cat.png'
import { URL } from './utils'

const url = URL
const title = 'Cat name generator'
const description = 'What should you name your kitten?'

const shareOptions = {
  reddit: { url, title },
  tumblr: { url, title, caption: description },
  pinterest: { url, description, media: worldCat },
  line: { url, title },
  whatsapp: { url, title }
}

export const Share = () => (
  <>
    <button
      id="share-button"
      className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
      <i className="material-icons">share</i>
    </button>

    <ul
      className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
      htmlFor="share-button">
      {Object.keys(shareOptions).map((name) => (
        <li
          className="mdl-menu__item"
          key={name}
          onClick={() => window.open(sharing[name](shareOptions[name]))}>
          {name[0].toUpperCase() + name.substring(1)}
        </li>
      ))}
    </ul>
  </>
)
