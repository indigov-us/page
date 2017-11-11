// @flow

import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import WithModal from '../hoc/with-modal'
import {providedFormValues, openedModal, closedModal} from '../states/with-newsletter-subscription-modal'

const cookieName = 'did-close-newsletter-subscription-modal'

export type FormValues = {
  email?: ?string
}

type Props = {
  children: any,
  isGateEnabled?: boolean
}

export type State = {
  form: {
    values: FormValues
  },
  isOpen?: boolean
}

export type OpenNewsletterSubscriptionModal = (FormValues) => any

class WithNewsletterSubscriptionModal extends Component<Props, State> {
  static childContextTypes = {
    openNewsletterSubscriptionModal: PropTypes.func
  }

  constructor () {
    super()
    this.state = {form: {values: {}}}
  }

  handleClose = () => {
    this.setState(closedModal)
    Cookies.set(cookieName, '1', {expires: 1})
  }

  handleOpen = (formValues?: FormValues) => {
    if (formValues) this.setState(providedFormValues(formValues))
    this.setState(openedModal)
  }

  componentDidMount () {
    const {isGateEnabled} = this.props

    if (isGateEnabled && !Cookies.get(cookieName)) {
      this.setState(openedModal)
    }
  }

  getChildContext = () => ({
    openNewsletterSubscriptionModal: this.handleOpen
  })

  render () {
    const {children} = this.props
    const {form: {values: {email}}, isOpen} = this.state

    return (
      <div>
        {children}

        <WithModal
          handleClose={this.handleClose}
          isOpen={isOpen}
        >
          {`hey sign up for my newsletter ${email || ''}`}
        </WithModal>
      </div>
    )
  }
}

export default WithNewsletterSubscriptionModal
