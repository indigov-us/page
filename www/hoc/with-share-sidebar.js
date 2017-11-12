// @flow

import React from 'react'
import FacebookIcon from 'react-icons/lib/io/social-facebook'

const sidebarWidth = '90px'

type Props = {
  children: any
}

const WithShareSidebar = ({children}: Props) => (
  <div className='relative'>
    <div className='main'>
      {children}
    </div>

    <aside className='absolute-ns top-0-ns left-0-ns'>
      <FacebookIcon
        className='db white bg-blue pa1'
        size={30}
      />
    </aside>

    <style jsx>{`
      @media (min-width: 30em) {
        aside { width: ${sidebarWidth} }
        .main { margin-left: ${sidebarWidth}; min-height: 300px; }
      }
    `}</style>
  </div>
)

export default WithShareSidebar
