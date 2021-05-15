import React, { useState, useEffect } from 'react'

export const IconInput = ({
  parentId,
  iconInfo,
  updateMedia,
  currentMedia
}) => {
  const [iconLabel, iconKey] = iconInfo
  const [selectedIcon, setSelectedIcon] = useState(currentMedia)

  useEffect(() => currentMedia && setSelectedIcon(currentMedia), [currentMedia])

  return (
    <div
      className={`media-select-container ${
        selectedIcon === iconLabel ? 'selected' : ''
      }`}
      onPointerDown={() => {
        updateMedia({
          variables: { media: iconLabel }
        })
        setSelectedIcon(iconLabel)
      }}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault()
          updateMedia({
            variables: { media: iconLabel }
          })
          setSelectedIcon(iconLabel)
        }
      }}
      tabIndex={currentMedia === iconLabel ? -1 : 0}
      role="button"
      aria-controls={parentId}
      id={`${parentId}-icon-${iconKey}`}>
      <label htmlFor={iconKey}>{iconLabel}</label>
      <i
        className={`material-icons mdl-list__item-icon edit-btn ${
          selectedIcon === iconLabel ? 'selected' : ''
        } ${selectedIcon === currentMedia ? 'updated' : ''}`}>
        {iconKey}
      </i>
    </div>
  )
}
