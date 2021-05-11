import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { CatFiction } from '../cat-fiction'
import { CatTranscription } from './cat-transcription'
import Query from './cat-name-details-query.graphql'

export const CatNameDetails = ({ name, ...props }) => {
  const { data, loading } = useQuery(gql(Query), {
    variables: { name }
  })

  return (
    <>
      <style>{`
        i.edit-btn, .mdl-list__item-icon.edit-btn {
          color: lightgrey;
        }
        i.edit-btn.selected {
          color: #767676;
        }
        i.edit-btn:hover, i.edit-btn:focus {
          cursor: pointer;
          color: #767676;
          outline: unset;
        }
        i.edit-btn.confirm:hover, i.edit-btn.confirm:focus {
          color: green;
        }
        i.edit-btn.destructive:hover, i.edit-btn.destructive:focus {
          color: maroon;
        }
        input {
          padding-left: 4px;
        }
        input:focus + label {
          opacity: 0;
        }
      `}</style>

      <div className="mdl-dialog__title">
        <CatTranscription
          name={name}
          transcribedName={data?.CatNameDetails?.transcribedName}
        />
      </div>
      <div className="mdl-dialog__content">
        <p>Excellent cat name! </p>
        <span>
          {data?.CatNameDetails?.transcribedName &&
            `This name can also be spelled as `}
          <strong>
            {loading ? (
              <div className="mdl-spinner is-active" />
            ) : (
              data?.CatNameDetails?.transcribedName
            )}
          </strong>
        </span>
        <p>
          {data?.CatNameDetails?.fiction?.length
            ? 'It is also known from:'
            : ''}
        </p>

        <CatFiction fiction={data?.CatNameDetails?.fiction} {...props} />
      </div>
    </>
  )
}
