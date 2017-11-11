// @flow

import PropTypes from 'prop-types'
import React from 'react'

import type {OpenNewsletterSubscriptionModal} from '../hoc/with-newsletter-subscription-modal'

type Props = {}

type Context = {
  openNewsletterSubscriptionModal: OpenNewsletterSubscriptionModal
}

const NewsletterSignUp = (props: Props, {openNewsletterSubscriptionModal}: Context) => {
  const handleFormSubmit = (e: SyntheticEvent<window.HTMLFormElement>) => {
    e.preventDefault()
    openNewsletterSubscriptionModal({
      email: e.currentTarget.elements.namedItem('email').value
    })
  }

  return (
    <div className='bb b--moon-gray pv3'>
      <div className='container'>
        <div className='mw center'>
          <div className='cf'>
            <div className='fl w-100 w-60-ns mb3 mb0-ns'>
              <div className='b mb1 f4'>
                {'Sign Up For My Newsletter'}
              </div>
              <div className='gray'>
                {'Get updates about big developments from my office'}
              </div>
            </div>
            <div className='fl w-100 w-40-ns'>
              <form
                className='cf'
                onSubmit={handleFormSubmit}
              >
                <input
                  className='br-pill pv2 ph3 f5 w-70 w-80-ns fl input-reset db center'
                  name='email'
                  placeholder='Your email address here...'
                  type='text'
                />
                <input
                  className='input-reset f5 pv2 w-30 w-20-ns fl db'
                  type='submit'
                  value='Submit'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .mw { max-width: 800px }
      `}</style>
    </div>
  )
}

NewsletterSignUp.contextTypes = {
  openNewsletterSubscriptionModal: PropTypes.func
}

export default NewsletterSignUp
