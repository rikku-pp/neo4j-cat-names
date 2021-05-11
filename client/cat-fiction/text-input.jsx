import React, { useRef, useState, useEffect } from 'react'
import { catNameMaxLength } from '../constants.js'

export const TextInput = ({ id, title, value = '', onUpdate, onDelete }) => {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => value && setInputValue(value), [value])

  const remove = value && onDelete ? () => onDelete(value) : undefined
  const update = onUpdate
    ? () => onUpdate(inputValue.substring(0, catNameMaxLength))
    : undefined

  return (
    <div className="mdl-textfield" style={{ display: 'block' }}>
      <input
        className="mdl-textfield__input"
        autoComplete="off"
        type="text"
        id={id}
        name={id}
        maxLength={catNameMaxLength}
        title={title}
        value={inputValue}
        ref={inputRef}
        disabled={!update}
        onInput={(e) => setInputValue(e.target.value)}
      />
      {(value !== inputValue || remove) && (
        <ActionIcons controls={id} onDelete={remove} onUpdate={update} />
      )}
      <label
        className={`mdl-textfield__label`}
        style={{
          display:
            inputRef.current === document.activeElement || inputValue
              ? 'none'
              : 'block'
        }}
        htmlFor={id}>
        {value || title}
      </label>
    </div>
  )
}

const ActionIcons = ({ onUpdate, onDelete, controls }) => (
  <div className="action-container">
    {onUpdate && (
      <i
        onClick={onUpdate}
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onUpdate()}
        aria-controls={controls}
        aria-label="Confirm"
        className="material-icons mdl-list__item-icon edit-btn confirm">
        check
      </i>
    )}
    {onDelete && (
      <i
        onClick={onDelete}
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onDelete()}
        aria-controls={controls}
        aria-label="Remove"
        className="material-icons mdl-list__item-icon edit-btn destructive">
        not_interested
      </i>
    )}
  </div>
)
