import React from 'react'
import { CatFictionEdit } from './cat-fiction-edit'

export const mediaTypes = {
  Book: 'menu_book',
  Movie: 'movie',
  Tv: 'tv',
  Comic: 'chat_bubble',
  Mascot: 'android',
  Meme: 'tag'
}

export const CatFiction = ({ fiction, editingIndex, setEditingIndex }) => {
  return (
    <ul
      className="mdl-list"
      id="fiction-list"
      aria-label="List of works the selected cat name appears in">
      <style>{`
        .fiction-info-container {
          width: 264px;
        }
        .fiction-info-container > div {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        } 
        .fiction-edit-container > div {
          padding-bottom: 0;
          display: flex !important;
        }
        .media-select-container {
          text-align: center;
        }
        .media-select-container:not(.selected), 
        .media-select-container:not(.selected) > * {
          cursor: pointer;
        }
        .media-select-container > label {
          color: lightgrey;
          font-size: x-small;
        }
        .media-select-container > i.edit-btn {
          color: lightgrey;
        }
        .media-select-container:focus {
          outline: unset;
        }
        .media-select-container:focus > *,
        .media-select-container:hover > *, 
        .media-select-container.selected > * {
          color: #767676 !important;
        }
        .existing-text-input {
          color: #000c;
        }
        .existing-text-input:focus {
          color: #0000;
        }
      `}</style>
      {fiction?.length
        ? fiction.map((work, index) =>
            editingIndex >= 0 && index === editingIndex ? (
              <CatFictionEdit
                fiction={fiction}
                fictionId={work.id}
                setEditingIndex={setEditingIndex}
                editingIndex={index}
                key={`fiction-${index}`}
                elementId={`fiction-${index}`}
              />
            ) : (
              <li
                className="mdl-list__item mdl-list__item--two-line"
                tabIndex={0}
                title={`Cat name appears in or as a ${work.media} called ${
                  work.title
                }${
                  work.genre?.length &&
                  ', which is in the genre ' +
                    work.genre.map((g) => g.name).join(', ')
                }`}
                id={`fiction-${index}`}
                key={`fiction-${index}`}>
                <span
                  className="mdl-list__item-primary-content fiction-info-container"
                  aria-hidden="true">
                  <i
                    title={work.media}
                    className="material-icons mdl-list__item-icon">
                    {mediaTypes[work.media] || ''}
                  </i>
                  <div>{work.title}</div>
                  <div className="mdl-list__item-sub-title">
                    {work.genre?.map((g) => g.name).join(' / ')}
                  </div>
                </span>
                <span className="mdl-list__item-secondary-content">
                  <i
                    id="edit-fiction"
                    title="edit"
                    className="material-icons edit-btn"
                    role="button"
                    tabIndex={0}
                    onClick={() => setEditingIndex(index)}
                    onKeyDown={(e) => e.key === ' ' && setEditingIndex(index)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && setEditingIndex(index)
                    }>
                    edit
                  </i>
                </span>
              </li>
            )
          )
        : ''}
    </ul>
  )
}
