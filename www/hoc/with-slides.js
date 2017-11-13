// @flow

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, {Children, Component} from 'react'

import {goToSlide, nextSlide, prevSlide} from '../states/with-slides'

export type Props = {
  children: any,
  currentSlide?: number,
  showNav?: boolean
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

  constructor (props: Props) {
    super(props)
    this.state = {slideIndex: props.currentSlide || 0}
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
    const {children, showNav} = this.props
    const {slideIndex} = this.state

    return (
      <div className='relative overflow-hidden'>
        {Children.map(children, (slide, i) => (
          <div
            className={classNames(
              'slide',
              slideIndex !== i && 'dn'
            )}
            key={i}
          >
            {slide}
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
