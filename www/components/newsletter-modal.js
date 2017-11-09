// @flow

import Cookies from 'js-cookie'
import React from 'react'

import WithModal from '../hoc/with-modal'

const cookieName = 'hide-newsletter-modal'

const NewsletterModal = () => (
  <WithModal
    afterClose={() => {
      Cookies.set(cookieName, '1', {expires: 1})
    }}
    onMount={({closeModal, openModal}) => {
      if (!Cookies.get(cookieName)) {
        openModal()
      }
    }}
  >
    {'hey sign up for my newsletter'}
  </WithModal>
)

export default NewsletterModal
