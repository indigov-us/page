// @flow

import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import NewsletterChooseIssues from '../components/newsletter-choose-issues'
import NewsletterGate from '../components/newsletter-gate'
import NewsletterPrimaryInfo from '../components/newsletter-primary-info'
import NewsletterThankYou from '../components/newsletter-thank-you'
import WithModal from '../hoc/with-modal'
import WithSlides from '../hoc/with-slides'
import {atSlide, providedFormValues, openedModal, closedModal} from '../states/with-newsletter-subscription-modal'

const cookieName = 'did-close-newsletter-subscription-modal'

export type FormValues = {
  address1?: string,
  address2?: string,
  email?: string,
  name?: string
}

type Props = {
  children: any,
  isGateEnabled?: boolean
}

export type State = {
  currentSlideIndex?: number,
  form: {
    values: FormValues
  },
  isOpen?: boolean
}

export type OpenNewsletterSubscriptionModal = (?FormValues) => any

class WithNewsletterSubscriptionModal extends Component<Props, State> {
  static childContextTypes = {
    closeModal: PropTypes.func,
    openNewsletterSubscriptionModal: PropTypes.func,
    updateProvidedFormValues: PropTypes.func
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
    this.setState(atSlide(1))
    this.setState(openedModal)
  }

  updateProvidedFormValues = (formValues: FormValues) => {
    this.setState(providedFormValues(formValues))
  }

  componentDidMount () {
    const {isGateEnabled} = this.props

    if (isGateEnabled && !Cookies.get(cookieName)) {
      this.setState(openedModal)
    }
  }

  getChildContext = () => ({
    closeModal: this.handleClose,
    openNewsletterSubscriptionModal: this.handleOpen,
    updateProvidedFormValues: this.updateProvidedFormValues
  })

  render () {
    const {children} = this.props
    const {currentSlideIndex, form: {values}, isOpen} = this.state

    return (
      <div>
        {children}

        <WithModal
          handleClose={this.handleClose}
          isOpen={isOpen}
        >
          <WithSlides currentSlide={currentSlideIndex}>
            <NewsletterGate />
            <NewsletterPrimaryInfo {...values} />
            <NewsletterChooseIssues />
            <NewsletterThankYou />
          </WithSlides>
        </WithModal>
      </div>
    )
  }
}

export default WithNewsletterSubscriptionModal
