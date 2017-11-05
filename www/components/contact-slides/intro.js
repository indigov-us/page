// @flow

import React from 'react'
import CalendarIcon from 'react-icons/lib/io/calendar'
import ChatIcon from 'react-icons/lib/io/chatbox-working'
import EmailIcon from 'react-icons/lib/io/ios-email-outline'
import PhoneIcon from 'react-icons/lib/io/ios-telephone'

import ContactMethodButton from '../../components/contact-method-button'

const Intro = () => (
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

export default Intro
