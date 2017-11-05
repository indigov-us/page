// @flow

import React from 'react'
import FrownIcon from 'react-icons/lib/fa/frown-o'
import MehIcon from 'react-icons/lib/fa/meh-o'
import SmileIcon from 'react-icons/lib/fa/smile-o'

import ArticleFeedbackItem from '../components/article-feedback-item'

const ArticleFeedback = () => (
  <div>
    <div className='mb3'>{'How helpful was this page?'}</div>
    <div>
      <ArticleFeedbackItem
        className='bg-green'
        Icon={SmileIcon}
      />
      <ArticleFeedbackItem
        className='bg-yellow'
        Icon={MehIcon}
      />
      <ArticleFeedbackItem
        className='bg-red'
        Icon={FrownIcon}
      />
    </div>
  </div>
)

export default ArticleFeedback
