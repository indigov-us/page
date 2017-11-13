// @flow

import PropTypes from 'prop-types'
import React from 'react'

type Props = {}

type Context = {
  closeModal: () => any
}

const NewsletterThankYou = (props: Props, {closeModal}: Context) => {
  return (
    <div className='modal-container'>
      <div className='f2 b mv3 tc'>{'Thank you!'}</div>

      <div className='mv3 tc'>
        <button
          className='br-pill bg-primary white input-reset bn ph3 pv2'
          onClick={closeModal}
          type='submit'
        >
          {'Done'}
        </button>
      </div>
    </div>
  )
}

NewsletterThankYou.contextTypes = {
  closeModal: PropTypes.func
}

export default NewsletterThankYou
