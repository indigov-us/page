// @flow

import classNames from 'classnames'
import React, {Component} from 'react'

import {nextSlide, prevSlide} from '../states/with-slides'

export type Props = {
  slides: Array<any>
}

export type State = {
  slideIndex: number
}

class WithSlides extends Component<Props, State> {
  constructor () {
    super()
    this.state = {slideIndex: 0}
  }

  handleNextSlide = () => {
    this.setState(nextSlide)
  }

  handlePrevSlide = () => {
    this.setState(prevSlide)
  }

  render = () => {
    const {slides} = this.props
    const {slideIndex} = this.state

    return (
      <div className='slides'>
        {slides.map((slide, i) => (
          <div
            className={classNames('slide', slideIndex !== i && 'dn')}
            key={i}
          >
            {slide}
          </div>
        ))}

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
      </div>
    )
  }
}

export default WithSlides
