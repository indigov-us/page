// @flow

import PropTypes from 'prop-types'
import React from 'react'

type Props = {}

type Context = {
  nextSlide: () => any
}

const NewsletterChooseIssues = (props: Props, {nextSlide}: Context) => {
  const handleFormSubmit = (e: SyntheticEvent<window.HTMLFormElement>) => {
    e.preventDefault()
    nextSlide()
  }

  return (
    <div className='modal-container'>
      <form onSubmit={handleFormSubmit}>
        <div className='f2 b mv3 tc'>{'Tell us what matters'}</div>

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

NewsletterChooseIssues.contextTypes = {
  nextSlide: PropTypes.func
}

export default NewsletterChooseIssues
