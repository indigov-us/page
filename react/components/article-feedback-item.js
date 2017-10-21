// @flow

import classNames from 'classnames'
import React from 'react'

type Props = {
  className: string,
  Icon: any
}

const ArticleFeedbackItem = ({className, Icon}: Props) => (
  <a
    className={classNames('dib white ph2 pv1 dim', className)}
    href='javascript:void(0)'
  >
    <Icon size={50} />
  </a>
)

export default ArticleFeedbackItem
