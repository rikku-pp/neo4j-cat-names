import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal } from './modal'
import { CatNameDetails } from './cat-name-details'

import NewFictionMutation from '../cat-fiction/new-fiction.graphql'

export const CatName = ({ name }) => {
  const [open, setOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [createNewFiction, { data: newFictionData, loading }] = useMutation(
    gql(NewFictionMutation),
    {
      variables: { catName: name, title: '' },
      refetchQueries: ['CatNameDetailsQuery'],
      onCompleted: () => {
        setEditingIndex(0)
        document.querySelector('#fiction-0').focus()
      },
      awaitRefetchQueries: true
    }
  )

  return (
    <div>
      {name && (
        <button
          className="mdl-button mdl-js-button"
          aria-label={`The cat's name is ${name}. Click for more info.`}
          onClick={() => setOpen(true)}>
          {name}
        </button>
      )}
      {open && (
        <Modal closeDialog={() => setOpen(false)}>
          <div>
            <style>{`
              #detail-modal{ 
                outline: unset; 
                width: 384px;
                max-width: 88vw;
                max-height: 100vh;
                overflow-y: auto;
              }
              .action-container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              #add-fiction {
                width: 36px;
              }
              `}</style>
            <dialog
              role="dialog"
              className="mdl-dialog"
              id="detail-modal"
              tabIndex={-1}
              open>
              <CatNameDetails
                name={name}
                newFictionData={newFictionData}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
              />
              <div className="action-container mdl-dialog__actions">
                <button
                  id="add-fiction"
                  aria-label="add-fiction"
                  className="mdl-button mdl-js-button mdl-button--icon"
                  disabled={loading}
                  onClick={createNewFiction}
                  onKeyDown={(e) => e.key === ' ' && createNewFiction}
                  onKeyPress={(e) => e.key === 'Enter' && createNewFiction}>
                  <i className="material-icons">
                    {loading ? 'hourglass_top' : 'add'}
                  </i>
                </button>
                <button
                  className="mdl-button"
                  onClick={() => setOpen(false)}
                  onKeyDown={(e) => e.key === ' ' && setOpen(false)}
                  onKeyPress={(e) => e.key === 'Enter' && setOpen(false)}>
                  Done
                </button>
              </div>
            </dialog>
          </div>
        </Modal>
      )}
    </div>
  )
}
