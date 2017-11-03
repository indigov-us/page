// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'
import CalendarIcon from 'react-icons/lib/io/calendar'
import ChatIcon from 'react-icons/lib/io/chatbox-working'
import EmailIcon from 'react-icons/lib/io/ios-email-outline'
import PhoneIcon from 'react-icons/lib/io/ios-telephone'

import ContactMethodButton from '../components/contact-method-button'
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

const introSlide = () => (
  <div className='tc'>
    <h1>{'How would you like to reach out?'}</h1>
    <div className='cf'>
      <div className='fl w-100 w-50-m w-25-l'>
        <ContactMethodButton
          className='bg-orange'
          desiredSlide={1}
          Icon={PhoneIcon}
          title='Call us'
        />
      </div>
      <div className='fl w-100 w-50-m w-25-l'>
        <ContactMethodButton
          className='bg-purple'
          desiredSlide={2}
          Icon={EmailIcon}
          title='Send us a letter'
        />
      </div>
      <div className='fl w-100 w-50-m w-25-l'>
        <ContactMethodButton
          className='bg-green'
          desiredSlide={3}
          Icon={ChatIcon}
          title='Send a message'
        />
      </div>
      <div className='fl w-100 w-50-m w-25-l'>
        <ContactMethodButton
          className='bg-red'
          desiredSlide={4}
          Icon={CalendarIcon}
          title='Schedule a visit'
        />
      </div>
    </div>
  </div>
)

const callUsSlide = () => <h1 className='tc'>{'Call us'}</h1>
const sendALetterSlide = () => <h1 className='tc'>{'Send us a letter'}</h1>
const sendAMessageSlide = () => <h1 className='tc'>{'Send a message'}</h1>
const visitSlide = () => <h1 className='tc'>{'Schedule a visit'}</h1>

const Contact = ({data}: Props) => {
  const userEdges = data && data.users && data.users.edges

  return (
    <div className='mb3'>
      <WithSlides
        slides={[
          introSlide,
          callUsSlide,
          sendALetterSlide,
          sendAMessageSlide,
          visitSlide
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
