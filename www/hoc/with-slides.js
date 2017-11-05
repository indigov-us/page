// @flow

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import {goToSlide, nextSlide, prevSlide} from '../states/with-slides'

export type Props = {
  showNav?: boolean,
  slides: Array<any>
}

export type State = {
  slideIndex: number
}

class WithSlides extends Component<Props, State> {
  static childContextTypes = {
    goToSlide: PropTypes.func,
    nextSlide: PropTypes.func,
    prevSlide: PropTypes.func
  }

  constructor () {
    super()
    this.state = {slideIndex: 0}
  }

  handleGoToSlide = (desiredSlide: number) => {
    this.setState(goToSlide(desiredSlide))
  }

  handleNextSlide = () => {
    this.setState(nextSlide)
  }

  handlePrevSlide = () => {
    this.setState(prevSlide)
  }

  getChildContext = () => ({
    goToSlide: this.handleGoToSlide,
    nextSlide: this.handleNextSlide,
    prevSlide: this.handlePrevSlide
  })

  render = () => {
    const {showNav, slides} = this.props
    const {slideIndex} = this.state

    return (
      <div className='relative overflow-hidden'>
        {slides.map((Slide, i) => (
          <div
            className={classNames(
              'slide',
              slideIndex !== i && 'dn'
            )}
            key={i}
          >
            <Slide goToSlide={this.handleGoToSlide} />
          </div>
        ))}

        {showNav && (
          <div>
            <a
              href='javascript:void(0)'
              onClick={this.handlePrevSlide}
            >
              {'Prev'}
            </a>
            <a
              href='javascript:void(0)'
              onClick={this.handleNextSlide}
            >
              {'Next'}
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default WithSlides
