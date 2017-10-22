// @flow

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import ReactModal from 'react-modal'

type Props = {
  children: any
}

type State = {
  isOpen: boolean
}

class WithModal extends Component<Props, State> {
  static childContextTypes = {
    openModal: PropTypes.func
  }

  constructor () {
    super()
    this.state = {isOpen: false}
  }

  closeModal = () => {
    this.setState({isOpen: false})
  }

  openModal = () => {
    this.setState({isOpen: true})
  }

  getChildContext = () => ({
    openModal: this.openModal
  })

  render () {
    const {children} = this.props
    const {isOpen} = this.state

    return (
      <ReactModal isOpen={isOpen}>
        {children}
      </ReactModal>
    )
  }
}

export default WithModal
