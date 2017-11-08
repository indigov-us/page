// @flow

import React, {Component} from 'react'
import {gql, graphql} from 'react-apollo'
import CalendarIcon from 'react-icons/lib/io/calendar'
import ChatIcon from 'react-icons/lib/io/chatbox-working'
import EmailIcon from 'react-icons/lib/io/ios-email-outline'
import PhoneIcon from 'react-icons/lib/io/ios-telephone'

import {changeSlide} from '../states/contact'
import ContactMethodButton from '../components/contact-method-button'
import ContactStaffer from '../components/contact-staffer'

type Props = {
  data: {
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

export type Slides = 'callUs' | 'sendLetter' | 'sendMessage' | 'scheduleVisit'
export type State = {
  activeSlide?: Slides
}

class Contact extends Component<Props, State> {
  constructor () {
    super()
    this.state = {}
  }

  handleCallUsClick = () => this.setState(changeSlide('callUs'))
  handleSendLetterClick = () => this.setState(changeSlide('sendLetter'))
  handleSendMessageClick = () => this.setState(changeSlide('sendMessage'))
  handleScheduleVisitClick = () => this.setState(changeSlide('scheduleVisit'))

  render () {
    const {data: {users}} = this.props
    const {activeSlide} = this.state
    const userEdges = users && users.edges

    return (
      <div className='mb3'>
        <div className='tc'>
          <h1>{'How would you like to reach out?'}</h1>
          <div className='bg-near-white'>
            <div className='cf'>
              <div className='fl w-100 w-50-m w-25-l'>
                <ContactMethodButton
                  Icon={PhoneIcon}
                  isSelected={activeSlide === 'callUs'}
                  onClick={this.handleCallUsClick}
                  title='Call us'
                />
              </div>
              <div className='fl w-100 w-50-m w-25-l'>
                <ContactMethodButton
                  Icon={EmailIcon}
                  isSelected={activeSlide === 'sendLetter'}
                  onClick={this.handleSendLetterClick}
                  title='Send us a letter'
                />
              </div>
              <div className='fl w-100 w-50-m w-25-l'>
                <ContactMethodButton
                  Icon={ChatIcon}
                  isSelected={activeSlide === 'sendMessage'}
                  onClick={this.handleSendMessageClick}
                  title='Send a message'
                />
              </div>
              <div className='fl w-100 w-50-m w-25-l'>
                <ContactMethodButton
                  Icon={CalendarIcon}
                  isSelected={activeSlide === 'scheduleVisit'}
                  onClick={this.handleScheduleVisitClick}
                  title='Schedule a visit'
                />
              </div>
            </div>

            {activeSlide === 'callUs' && (
              <div className='pv4'>{'call us'}</div>
            )}

            {activeSlide === 'sendLetter' && (
              <div className='pv4'>{'send a letter'}</div>
            )}

            {activeSlide === 'sendMessage' && (
              <div className='pv4'>{'send a message'}</div>
            )}

            {activeSlide === 'scheduleVisit' && (
              <div className='pv4'>{'schedule a visit'}</div>
            )}
          </div>
        </div>

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
