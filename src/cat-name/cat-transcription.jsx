import React, { useState, useRef } from 'react'
import { catNameMaxLength } from '../constants.js'
import { useMutation, gql } from '@apollo/client'
import { mutationErrorAlert } from '../utils.js'

const SET_TRANSCRIPTION = gql`
  mutation SetTranscription($name: String!, $transcribedName: String!) {
    UpdateCatName(name: $name, transcribedName: $transcribedName) {
      name
      transcribedName
    }
  }
`

export const CatTranscription = ({ name, transcribedName = '' }) => {
  const [show, setShow] = useState(false)
  const inputRef = useRef(null)
  const [updateTranscription, { data }] = useMutation(SET_TRANSCRIPTION, {
    onError: mutationErrorAlert
  })

  const updateField = () => {
    setShow(false)
    updateTranscription({
      variables: {
        name,
        transcribedName: String(inputRef.current.value).substring(
          0,
          catNameMaxLength
        )
      },
      refetchQueries: ['CatNameDetailsQuery']
    })
  }

  const handleEnterKey = (event) => {
    event.key === 'Tab' && setShow(false)
    event.key === 'Enter' && event.preventDefault()
    if (
      event.key === 'Enter' &&
      inputRef.current.value &&
      inputRef.current.value !== ' '
    ) {
      updateField()
    }
  }

  return (
    <>
      <div>
        <style>{`
            .title {
              padding: 22px 0;
            }
            .title#text {
              margin-right: 1rem;
            }
          `}</style>
        {show ? (
          <div className="mdl-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              id="transcription-input"
              name="transcription-input"
              title={`Add an alternative spelling for ${name}`}
              ref={inputRef}
              autoComplete="off"
              placeholder={
                data?.UpdateCatName?.transcribedName || transcribedName
              }
              onBlur={() => {
                setShow(false)
              }}
              onKeyPress={handleEnterKey}
              autoFocus
            />
            <label
              className="mdl-textfield__label"
              htmlFor="transcription-input">
              {data?.UpdateCatName?.transcribedName || transcribedName}
            </label>
          </div>
        ) : (
          <div className="title">
            <span role="heading" aria-level={1} aria-label="Cat name">
              {name}
            </span>
            <i
              id="edit-transcription"
              className="icon material-icons edit-btn"
              aria-describedby="edit-transcription"
              role="button"
              maxLength={catNameMaxLength}
              onClick={() => setShow(!show)}
              onKeyUp={(event) => event.key === ' ' && setShow(!show)}
              tabIndex={0}>
              translate
            </i>
            <div className="mdl-tooltip" id="edit-transcription">
              Edit transcription
            </div>
          </div>
        )}
      </div>
    </>
  )
}
