// @flow

import classNames from 'classnames'
import {Link} from 'next-url-prettifier'
import PropTypes from 'prop-types'
import React from 'react'
import {gql, graphql} from 'react-apollo'
import ContactIcon from 'react-icons/lib/io/ios-email-outline'
import PassportIcon from 'react-icons/lib/io/ios-bookmarks-outline'
import PolicyQuestionIcon from 'react-icons/lib/io/ios-paper-outline'
import ScheduleIcon from 'react-icons/lib/io/calendar'
import ServiceIcon from 'react-icons/lib/io/wrench'
import TeamIcon from 'react-icons/lib/io/ios-people-outline'
import VeteransIcon from 'react-icons/lib/io/ribbon-a'
import VolunteerIcon from 'react-icons/lib/io/ios-person-outline'

import HeroNavButton from '../components/hero-nav-button'
import HeroQuickLink from '../components/hero-quick-link'
import {themeId} from '../lib/theme'
import {Router} from '../routes'

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

type Context = {
  customized: {
    full_name?: string,
    hero_image?: string,
    hero_image_tint?: number
  }
}

const Hero = ({data, quickLinks}: Props, {customized: {full_name: customizedFullName, hero_image: customizedHeroImage, hero_image_tint: customizedHeroImageTint}}: Context) => (
  <section className='bg-dark-gray white relative cover bg-top'>
    <div
      className={classNames(
        'absolute top-0 bottom-0 left-0 right-0',
        `bg-black-${customizedHeroImageTint || (data && data.theme && data.theme.heroImageTint) || '0'}`
      )}
    />

    <div className='container relative'>
      <nav className='cf pt3'>
        <div className='fl w-30'>
          <Link route={Router.linkPage('index')}>
            <a className='white b f4 no-underline'>
              {customizedFullName || (data && data.theme && data.theme.fullName) || 'Name'}
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
        <div className='f2 f1-ns f-title'>
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
            <HeroQuickLink
              Icon={PolicyQuestionIcon}
              iconSize={50}
              title='Policy Question'
            />
            <HeroQuickLink
              Icon={VeteransIcon}
              iconSize={50}
              title='Veterans Services'
            />
            <HeroQuickLink
              Icon={PassportIcon}
              iconSize={50}
              title='Expedite a Passport'
            />
            <HeroQuickLink
              Icon={ScheduleIcon}
              iconSize={50}
              title='Schedule a Visit'
            />
            <HeroQuickLink
              Icon={VolunteerIcon}
              iconSize={50}
              title='Become a Volunteer'
            />
            <HeroQuickLink
              Icon={TeamIcon}
              iconSize={50}
              title='Meet the Team'
            />
            <HeroQuickLink
              Icon={ServiceIcon}
              iconSize={50}
              title='Service Request'
            />
            <HeroQuickLink
              Icon={ContactIcon}
              iconSize={50}
              title='Contact Me'
            />
          </div>
        </div>
      )}
    </div>

    <style jsx>{`
      section { background-image: url(${customizedHeroImage || (data && data.theme && data.theme.heroImage) || ''}) }
      input { max-width: 500px }
    `}</style>
  </section>
)

Hero.contextTypes = {
  customized: PropTypes.object
}

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
