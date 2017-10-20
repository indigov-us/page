// @flow

import React from 'react'

type Props = {
  children: any
}

const WithSidebar = ({children}: Props) => (
  <div className='container relative'>
    <div className='main'>
      {children}
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
      $sidebarWidth: 200px;

      @media (min-width: 30em) {
        aside { width: $sidebarWidth }
        .main {
          margin-left: $sidebarWidth;
          min-height: 300px;
        }
      }
    `}</style>
  </div>
)

export default WithSidebar
