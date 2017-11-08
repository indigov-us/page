// @flow

import classNames from 'classnames'
import {Link} from 'next-url-prettifier'
import PropTypes from 'prop-types'
import React from 'react'
import {gql, graphql} from 'react-apollo'
import OpenMobileMenuIcon from 'react-icons/lib/io/navicon'

import HeroNavButton from '../components/hero-nav-button'
import HeroQuickLink from '../components/hero-quick-link'
import HeroSearch from '../components/hero-search'
import WithModal from '../hoc/with-modal'
import linkTo from '../lib/link-to'
import {themeId} from '../lib/theme'
import ContactComponent from '../components/contact'

const navHeight = 38 // px

export type Props = {
  data: {
    categories?: {
      edges: Array<{
        node: {
          id: string,
          link: string,
          name: string
        }
      }>
    },
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

const Hero = ({data: {categories, quickLinks, theme}, showQuickLinks}: Props, {customized, openMobileMenu}: Context) => {
  const customizedFullName = customized && customized.full_name
  const customizedHeroHeadline = customized && customized.hero_headline
  const customizedHeroImage = customized && customized.hero_image
  const customizedHeroImageTint = customized && customized.hero_image_tint

  const quickLinksEdges = quickLinks && quickLinks.edges

  return (
    <section className='bg-dark-gray white relative cover bg-top'>
      <div
        className={classNames(
          'absolute top-0 bottom-0 left-0 right-0',
          `bg-black-${customizedHeroImageTint || (theme && theme.heroImageTint) || '0'}`
        )}
      />

      <div className='container relative'>
        <nav className='cf pt3'>
          <div className='fl w-70 w-30-ns h-100'>
            <Link route={linkTo('index')}>
              <a className='white b f4 no-underline nav-lh nowrap'>
                {customizedFullName || (theme && theme.fullName) || 'Name'}
              </a>
            </Link>
          </div>
          <div className='fl w-30 w-70-ns tr h-100'>
            <div className='dn dib-l h-100'>
              <Link route={linkTo('index')}>
                <a><HeroNavButton>{'Home'}</HeroNavButton></a>
              </Link>

              {categories && categories.edges.map(({node: {id, link, name}}) => (
                <Link
                  key={id}
                  route={linkTo(link)}
                >
                  <a><HeroNavButton>{name}</HeroNavButton></a>
                </Link>
              ))}

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
            {customizedHeroHeadline || (theme && theme.heroHeadline) || 'Have a question? Let me help.'}
          </div>
          <div className='mv3'>
            {'Type your question below to get an immediate response from my team office.'}
          </div>
          <HeroSearch />
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
        nav { height: ${navHeight}px }
        .nav-lh { line-height: ${navHeight}px }
        section { background-image: url(${customizedHeroImage || (theme && theme.heroImage) || ''}) }
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
    categories {
      edges {
        node {
          id
          link
          name
        }
      }
    }
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
