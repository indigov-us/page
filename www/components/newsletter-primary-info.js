// @flow

import PropTypes from 'prop-types'
import React from 'react'

import type {FormValues} from '../hoc/with-newsletter-subscription-modal'

type Props = FormValues

type Context = {
  nextSlide: () => any
}

const NewsletterPrimaryInfo = ({address1, address2, email, name}: Props, {nextSlide}: Context) => {
  const handleFormSubmit = (e: SyntheticEvent<window.HTMLFormElement>) => {
    e.preventDefault()
    nextSlide()
  }

  return (
    <div className='modal-container'>
      <form onSubmit={handleFormSubmit}>
        <div className='f2 b mv3 tc'>{'Enter your info'}</div>

        <div className='mb2'>
          <label
            className='b'
            htmlFor='Name'
          >
            {'Name'}
          </label>
        </div>
        <input
          className='input-reset db w-100 pa2 mb3'
          defaultValue={name}
          key={`name${name || ''}`}
          name='name'
          type='text'
        />

        <div className='mb2'>
          <label
            className='b'
            htmlFor='Email'
          >
            {'Email'}
          </label>
        </div>
        <input
          className='input-reset db w-100 pa2 mb3'
          defaultValue={email}
          key={`email${email || ''}`}
          name='email'
          type='email'
        />

        <div className='mb2'>
          <label
            className='b'
            htmlFor='address1'
          >
            {'Address Line 1'}
          </label>
        </div>
        <input
          className='input-reset db w-100 pa2 mb3'
          defaultValue={address1}
          name='address1'
          type='text'
        />

        <div className='mb2'>
          <label
            className='b'
            htmlFor='address2'
          >
            {'Address Line 2'}
          </label>
        </div>
        <input
          className='input-reset db w-100 pa2 mb3'
          defaultValue={address2}
          name='address2'
          type='text'
        />

        <div className='mv3 tc'>
          <button
            className='br-pill bg-primary white input-reset bn ph3 pv2'
            type='submit'
          >
            {'Next'}
          </button>
        </div>
      </form>
    </div>
  )
}

NewsletterPrimaryInfo.contextTypes = {
  nextSlide: PropTypes.func
}

export default NewsletterPrimaryInfo
