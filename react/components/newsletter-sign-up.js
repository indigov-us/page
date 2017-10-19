// @flow

import React from 'react'

const NewsletterSignUp = () => (
  <div className='bb b--moon-gray pv3'>
    <div className='container'>
      <div className='mw center'>
        <div className='cf'>
          <div className='fl w-100 w-60-ns mb3 mb0-ns'>
            <div className='b mb1 f4'>
              {'Sign Up For My Newsletter'}
            </div>
            <div className='gray'>
              {'Get updates about big developments from my office'}
            </div>
          </div>
          <div className='fl w-100 w-40-ns'>
            <input
              className='br-pill pv2 ph3 f5 w-100 db center'
              placeholder='Your email address here...'
              type='text'
            />
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .mw { max-width: 800px }
    `}</style>
  </div>
)

export default NewsletterSignUp
