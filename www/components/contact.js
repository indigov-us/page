// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'

import CallSlide from '../components/contact-slides/call'
import IntroSlide from '../components/contact-slides/intro'
import LetterSlide from '../components/contact-slides/letter'
import MessageSlide from '../components/contact-slides/message'
import VisitSlide from '../components/contact-slides/visit'
import ContactStaffer from '../components/contact-staffer'
import WithSlides from '../hoc/with-slides'

type Props = {
  data?: {
    users?: {
      edges: Array<{
        node: {
          avatar: {
            height: number,
            url: string,
            width: number
          },
          description?: string,
          id: string,
          name?: string
        }
      }>
    }
  }
}

const Contact = ({data}: Props) => {
  const userEdges = data && data.users && data.users.edges

  return (
    <div className='mb3'>
      <WithSlides
        slides={[
          IntroSlide,
          CallSlide,
          LetterSlide,
          MessageSlide,
          VisitSlide
        ]}
      />

      {userEdges && userEdges.length ? (
        <div className='tc mt4'>
          <h2 className='mb2'>{'Meet our staff'}</h2>
          <div className='mb4'>{'Meet the staff members who organize and respond to the messages we receive.'}</div>
          <div className='cf'>
            {userEdges.map(({node}) => (
              <div
                className='fl w-100 w-third-ns'
                key={node.id}
              >
                <ContactStaffer {...node} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default graphql(gql(`
  query {
    users {
      edges {
        node {
          avatar {
            height
            url
            width
          }
          description
          id
          name
        }
      }
    }
  }
`))(Contact)
