// @flow

import classNames from 'classnames'
import {Link} from 'next-url-prettifier'
import React from 'react'
import {gql, graphql} from 'react-apollo'

import HeroNavButton from '../components/hero-nav-button'
import HeroQuickLink from '../components/hero-quick-link'
import {Router} from '../routes'

const themeId = 'dGhlbWU6cG5pZ2h0cw=='

export type Props = {
  data?: {
    theme?: {
      fullName: ?string,
      heroImage: ?string,
      heroImageTint: ?(0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90)
    }
  },
  quickLinks?: boolean
}

const Hero = ({data, quickLinks}: Props) => (
  <section className='bg-dark-gray white relative cover bg-top'>
    <div
      className={classNames(
        'absolute top-0 bottom-0 left-0 right-0',
        data && data.theme && data.theme.heroImageTint && `bg-black-${data.theme.heroImageTint}`
      )}
    />

    <div className='container relative'>
      <nav className='cf pt3'>
        <div className='fl w-30'>
          <Link route={Router.linkPage('index')}>
            <a className='white b f4 no-underline'>
              {(data && data.theme && data.theme.fullName) || 'Name'}
            </a>
          </Link>
        </div>
        <div className='fl w-70 tr'>
          <div className='dn dib-l'>
            <HeroNavButton>{'Home'}</HeroNavButton>
            <HeroNavButton>{'Polls'}</HeroNavButton>
            <HeroNavButton>{'Blog'}</HeroNavButton>
            <HeroNavButton>{'Press'}</HeroNavButton>
            <HeroNavButton>{'FAQ'}</HeroNavButton>
          </div>
          <HeroNavButton opaque>{'Contact'}</HeroNavButton>
        </div>
      </nav>

      <div className='tc pv5'>
        <div className='f2 f1-ns'>
          {'Have a question? Let me help.'}
        </div>
        <div className='mv3'>
          {'Type your question below to get an immediate response from my team office.'}
        </div>
        <input
          className='br-pill pv2 ph3 f4 db w-100 center'
          placeholder='Can you please expedite my passport...'
          type='text'
        />
      </div>

      {quickLinks && (
        <div className='pb5'>
          <div className='tc b mb3'>{'Quick Links'}</div>
          <div className='cf'>
            <HeroQuickLink>{'Policy Question'}</HeroQuickLink>
            <HeroQuickLink>{'Veterans Services'}</HeroQuickLink>
            <HeroQuickLink>{'Expedite a Passport'}</HeroQuickLink>
            <HeroQuickLink>{'Schedule a Visit'}</HeroQuickLink>
            <HeroQuickLink>{'Become a Volunteer'}</HeroQuickLink>
            <HeroQuickLink>{'Meet the Team'}</HeroQuickLink>
            <HeroQuickLink>{'Service Request'}</HeroQuickLink>
            <HeroQuickLink>{'Contact Me'}</HeroQuickLink>
          </div>
        </div>
      )}
    </div>

    <style jsx>{`
      section { background-image: url(${(data && data.theme && data.theme.heroImage) || ''}) }
      input { max-width: 500px }
    `}</style>
  </section>
)

Hero.displayName = 'Hero'

export default graphql(gql(`
  query {
    theme (id: "${themeId}") {
      fullName
      heroImage
      heroImageTint
    }
  }
`))(Hero)
