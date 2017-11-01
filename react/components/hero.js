// @flow

import classNames from 'classnames'
import {Link} from 'next-url-prettifier'
import PropTypes from 'prop-types'
import React from 'react'
import {gql, graphql} from 'react-apollo'
import OpenMobileMenuIcon from 'react-icons/lib/io/navicon'

import HeroNavButton from '../components/hero-nav-button'
import HeroQuickLink from '../components/hero-quick-link'
import WithModal from '../hoc/with-modal'
import {themeId} from '../lib/theme'
import linkTo from '../lib/link-to'
import ContactComponent from '../components/contact'

const navHeight = 38 // px

export type Props = {
  data?: {
    quickLinks?: {
      edges: Array<{
        node: {
          id: string,
          title: string,
          link: string,
          icon: string
        }
      }>
    },
    theme?: {
      fullName: ?string,
      heroHeadline?: string,
      heroImage: ?string,
      heroImageTint: ?(0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90)
    }
  },
  showQuickLinks?: boolean
}

type Context = {
  customized?: {
    full_name?: string,
    hero_headline?: string,
    hero_image?: string,
    hero_image_tint?: number
  },
  openMobileMenu: any => any,
}

const Hero = ({data, showQuickLinks}: Props, {customized, openMobileMenu}: Context) => {
  const customizedFullName = customized && customized.full_name
  const customizedHeroHeadline = customized && customized.hero_headline
  const customizedHeroImage = customized && customized.hero_image
  const customizedHeroImageTint = customized && customized.hero_image_tint

  const quickLinksEdges = data && data.quickLinks && data.quickLinks.edges

  return (
    <section className='bg-dark-gray white relative cover bg-top'>
      <div
        className={classNames(
          'absolute top-0 bottom-0 left-0 right-0',
          `bg-black-${customizedHeroImageTint || (data && data.theme && data.theme.heroImageTint) || '0'}`
        )}
      />

      <div className='container relative'>
        <nav className='cf pt3'>
          <div className='fl w-70 w-30-ns h-100'>
            <Link route={linkTo('index')}>
              <a className='white b f4 no-underline nav-lh nowrap'>
                {customizedFullName || (data && data.theme && data.theme.fullName) || 'Name'}
              </a>
            </Link>
          </div>
          <div className='fl w-30 w-70-ns tr h-100'>
            <div className='dn dib-l h-100'>
              <HeroNavButton>{'Home'}</HeroNavButton>
              <HeroNavButton>{'Polls'}</HeroNavButton>
              <HeroNavButton>{'Blog'}</HeroNavButton>
              <HeroNavButton>{'Press'}</HeroNavButton>
              <HeroNavButton>{'FAQ'}</HeroNavButton>
              <WithModal
                button={<HeroNavButton opaque>{'Contact'}</HeroNavButton>}
                className='dib'
              >
                <ContactComponent />
              </WithModal>
            </div>
            <div className='dn-l h-100 relative'>
              <a
                className='white dib v-center absolute right-0'
                href='javascript:void(0)'
                onClick={openMobileMenu}
              >
                <OpenMobileMenuIcon size={34} />
              </a>
            </div>
          </div>
        </nav>

        <div className='tc pv5'>
          <div className='f2 f1-ns f-title'>
            {customizedHeroHeadline || (data && data.theme && data.theme.heroHeadline) || 'Have a question? Let me help.'}
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

        {showQuickLinks && quickLinksEdges && quickLinksEdges.length ? (
          <div className='pb5'>
            <div className='tc b mb3'>{'Quick Links'}</div>
            <div className='cf'>
              {quickLinksEdges.map(({node}) => (
                <HeroQuickLink
                  key={node.id}
                  {...node}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        input { max-width: 500px }
        nav { height: ${navHeight}px }
        .nav-lh { line-height: ${navHeight}px }
        section { background-image: url(${customizedHeroImage || (data && data.theme && data.theme.heroImage) || ''}) }
      `}</style>
    </section>
  )
}

Hero.contextTypes = {
  customized: PropTypes.object,
  openMobileMenu: PropTypes.func
}

Hero.displayName = 'Hero'

export default graphql(gql(`
  query {
    quickLinks {
      edges {
        node {
          id
          title
          link
          icon
        }
      }
    }
    theme (id: "${themeId}") {
      fullName
      heroHeadline
      heroImage
      heroImageTint
    }
  }
`))(Hero)
