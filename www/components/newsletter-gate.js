// @flow

import PropTypes from 'prop-types'
import React from 'react'

import type {FormValues} from '../hoc/with-newsletter-subscription-modal'

type Props = {}

type Context = {
  nextSlide: () => any,
  updateProvidedFormValues: FormValues => any
}

const NewsletterGate = (props: Props, {nextSlide, updateProvidedFormValues}: Context) => {
  const handleFormSubmit = (e: SyntheticEvent<window.HTMLFormElement>) => {
    e.preventDefault()
    updateProvidedFormValues({
      email: e.currentTarget.elements.namedItem('email').value,
      name: e.currentTarget.elements.namedItem('name').value
    })
    nextSlide()
  }

  return (
    <div className='modal-container'>
      <form onSubmit={handleFormSubmit}>
        <div className='f2 b mv3 tc'>{'Welcome to my site!'}</div>

        <div className='bg-black white pa3'>
          <div className='f4 mb1'>{'Sign up for my newsletter'}</div>
          <div className='mb2'>{'Be the first to know about key developments in Congress and what I am doing to represent the best interests of the district'}</div>
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
            name='email'
            type='email'
          />
        </div>

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

NewsletterGate.contextTypes = {
  nextSlide: PropTypes.func,
  updateProvidedFormValues: PropTypes.func
}

export default NewsletterGate
