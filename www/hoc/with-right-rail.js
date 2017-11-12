// @flow

import React from 'react'

const rightRailWidth = '200px'

type Props = {
  children: any
}

const WithRightRail = ({children}: Props) => (
  <div className='relative'>
    <div className='main'>
      {children}
    </div>

    <aside className='dn db-l absolute-l top-0-l right-0-l'>
      {'right rail'}
    </aside>

    <style jsx>{`
      @media (min-width: 60em) {
        aside { width: ${rightRailWidth} }
        .main { margin-right: ${rightRailWidth}; min-height: 300px; }
      }
    `}</style>
  </div>
)

export default WithRightRail
