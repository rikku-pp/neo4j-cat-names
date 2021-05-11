import React from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'

import { IconInput } from './icon-input'
import { TextInput } from './text-input'

import { mutationErrorAlert } from '../utils'
import { mediaTypes } from './cat-fiction'

import GetFiction from './get-fiction.graphql'
import UpdateFiction from './update-fiction.graphql'
import MergeGenre from './merge-genre.graphql'
import RemoveGenre from './remove-genre.graphql'
import RemoveFiction from './remove-fiction.graphql'

export const CatFictionEdit = ({
  elementId,
  fictionId,
  editingIndex,
  setAddNewFiction,
  setEditingIndex
}) => {
  const { data } = useQuery(gql(GetFiction), { variables: { id: fictionId } })
  const [updateFiction] = useMutation(gql(UpdateFiction), {
    variables: {
      id: fictionId,
      title: data?.GetFiction?.title || '',
      media: data?.GetFiction?.media || 'Unknown'
    },
    onError: mutationErrorAlert,
    refetchQueries: ['GetFiction', 'CatNameDetailsQuery']
  })

  const [removeFiction] = useMutation(gql(RemoveFiction), {
    onError: mutationErrorAlert,
    refetchQueries: ['CatNameDetailsQuery'],
    onCompleted: () => setEditingIndex(null),
    awaitRefetchQueries: true
  })

  const [mergeGenre] = useMutation(gql(MergeGenre), {
    onError: mutationErrorAlert,
    refetchQueries: ['GetFiction', 'CatNameDetailsQuery']
  })
  const [removeGenre] = useMutation(gql(RemoveGenre), {
    onError: mutationErrorAlert,
    refetchQueries: ['GetFiction', 'CatNameDetailsQuery']
  })

  return (
    <li
      className="mdl-list__item"
      id={elementId}
      tabIndex={0}
      aria-label={`Modifying fiction ${data?.GetFiction?.title || 'untitled'}`}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div className="action-container">
          {Object.entries(mediaTypes).map((media, i) => (
            <IconInput
              updateMedia={updateFiction}
              currentMedia={data?.GetFiction?.media}
              iconInfo={media}
              key={`${elementId}-icon-${i}`}
              parentId={elementId}
            />
          ))}
        </div>
        <div className="fiction-edit-container">
          <TextInput
            id={`fiction-${editingIndex}-title`}
            key={`fiction-${editingIndex}-title`}
            title={'Enter title of the referencing work'}
            onUpdate={(newTitle) =>
              updateFiction({ variables: { title: newTitle } })
            }
            value={data?.GetFiction?.title}
          />
          {data?.GetFiction?.genre?.map((g, i) => (
            <TextInput
              id={`fiction-${editingIndex}-genre-${i}`}
              key={`fiction-${editingIndex}-genre-${i}`}
              value={g.name}
              onDelete={(name) => removeGenre({ variables: { name } })}
            />
          )) || ''}
          <TextInput
            id={`fiction-${editingIndex}-genre-${data?.GetFiction?.genre?.length}`}
            key={`fiction-${editingIndex}-genre-${data?.GetFiction?.genre?.length}`}
            title={`Add ${
              data?.GetFiction?.genre?.length ? 'another' : 'a'
            } genre`}
            onUpdate={(name) => {
              mergeGenre({ variables: { name, fictionId } })
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <i
              className="material-icons mdl-list__item-icon edit-btn"
              style={{ paddingTop: 10 }}
              tabIndex={0}
              aria-label="Close fiction editor"
              aria-controls={`fiction-${editingIndex}-${data?.GetFiction?.title}`}
              role="button"
              onClick={() => setEditingIndex(null)}
              onKeyPress={(e) =>
                ['Enter', ' '].includes(e.key) && setEditingIndex(null)
              }>
              keyboard_return
            </i>
            <i
              className="material-icons mdl-list__item-icon edit-btn destructive"
              style={{ paddingTop: 10 }}
              tabIndex={0}
              aria-label={`Delete fiction ${data?.GetFiction?.title}`}
              aria-controls={`fiction-${editingIndex}-${data?.GetFiction?.title}`}
              role="button"
              onClick={() => removeFiction({ variables: { id: fictionId } })}
              onKeyPress={(e) =>
                ['Enter'].includes(e.key) &&
                removeFiction({ variables: { id: fictionId } })
              }>
              delete
            </i>
          </div>
        </div>
      </div>
    </li>
  )
}
