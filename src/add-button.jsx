import React from 'react'

export const AddButton = ({
  emptyState = true,
  show = true,
  description,
  id
}) => {
  return (
    <div
      className={emptyState ? 'mdl-button' : ''}
      style={{
        lineHeight: '32px',
        maxHeight: 32,
        overflow: 'visible',
        paddingLeft: 0,
        display: show ? 'block' : 'none'
      }}
      id={id}>
      <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
        <i className="material-icons">add</i>
      </button>
      {emptyState ? description : ''}
    </div>
  )
}
