// @flow

import classNames from 'classnames'
import React from 'react'

type Props = {
  className?: string,
  Icon: any,
  isSelected?: boolean,
  onClick: () => any,
  title: string
}

const ContactMethodButton = ({className, Icon, isSelected, onClick, title}: Props) => (
  <a
    className={classNames(
      className,
      isSelected ? 'bw4' : 'bw3',
      'db black relative no-underline b hover-bg-primary bg-animate bb'
    )}
    href='javascript:void(0)'
    onClick={onClick}
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

export default ContactMethodButton
