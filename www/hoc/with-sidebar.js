// @flow

import React from 'react'

import ArticleFeedback from '../components/article-feedback'

const sidebarWidth = 200 // px

type Props = {
  children: any
}

const WithSidebar = ({children}: Props) => (
  <div className='container relative'>
    <div className='main'>
      {children}

      <hr className='mv4' />

      <div className='bg-light-gray pv3 tc'>
        <ArticleFeedback />
      </div>
    </div>

    <aside className='absolute-ns top-0-ns left-0-ns'>
      <div className='f-title'>{'Categories'}</div>
      <ul className='list pa0 lh-copy'>
        <li className='f6'>{'Policy Question'}</li>
        <li className='f6'>{'Service Request'}</li>
        <li className='f6'>{'Expedited Passport'}</li>
        <li className='f6'>{'Schedule a Visit'}</li>
        <li className='f6'>{'Job Opportunities'}</li>
        <li className='f6'>{'Volunteer Opportunities'}</li>
        <li className='f6'>{'Meet the Staff'}</li>
        <li className='f6'>{'Budgetary Questions'}</li>
        <li className='f6'>{'Local Activities'}</li>
        <li className='f6'>{'Come to an Event'}</li>
      </ul>
    </aside>

    <style jsx>{`
      @media (min-width: 30em) {
        aside { width: ${sidebarWidth}px }
        .main { margin-left: ${sidebarWidth}px; min-height: 300px; }
      }
    `}</style>
  </div>
)

export default WithSidebar
