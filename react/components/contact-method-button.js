// @flow

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

type Props = {
  className: string,
  desiredSlide: number,
  Icon: any,
  title: string
}

type Context = {
  goToSlide: (slide: number) => any
}

const ContactMethodButton = ({className, desiredSlide, Icon, title}: Props, {goToSlide}: Context) => (
  <a
    className={classNames(className, 'db white relative no-underline b hover-bg-primary bg-animate')}
    href='javascript:void(0)'
    onClick={() => goToSlide(desiredSlide)}
  >
    <div className='v-center absolute left-0 right-0'>
      <div className='mb1'>
        <Icon size={50} />
      </div>
      <div>{title}</div>
    </div>
    <style jsx>{`
      a { height: 120px }
    `}</style>
  </a>
)

ContactMethodButton.contextTypes = {
  goToSlide: PropTypes.func,
  nextSlide: PropTypes.func
}

export default ContactMethodButton
