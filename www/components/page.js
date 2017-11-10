// @flow

import Head from 'next/head'
import Router from 'next/router'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {gql, graphql} from 'react-apollo'

import Footer from '../components/footer'
import Hero from '../components/hero'
import type {Props as HeroProps} from '../components/hero'
import NewsletterSignUp from '../components/newsletter-sign-up'
import NewsletterGate from '../components/newsletter-gate'
import WithMobileMenu from '../hoc/with-mobile-menu'
import {defaultPrimaryHex, themeId} from '../lib/theme'

type Props = {
  children: any,
  data: {
    theme?: {
      emailModalGate: boolean,
      gaViewId: ?string,
      primaryHex: ?string
    }
  },
  hero?: HeroProps,
  title?: string
}

class Page extends Component<Props> {
  static contextTypes = {
    customized: PropTypes.object
  }

  static displayName = 'Page'

  componentDidMount () {
    const {gtag} = window
    const {data: {theme}} = this.props
    const gaViewId = theme && theme.gaViewId

    if (gaViewId && gtag) {
      Router.onRouteChangeStart = path => {
        // https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
        gtag('config', gaViewId, {page_path: path})
      }
    }
  }

  render () {
    const {children, data: {theme}, hero, title} = this.props
    const {customized} = this.context
    const primaryHex = (customized && customized.primary_hex) || (theme && theme.primaryHex) || defaultPrimaryHex
    const gaViewId = theme && theme.gaViewId

    return (
      <div>
        <Head>
          <meta
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
            name='viewport'
          />

          {/* google analytics */}
          {gaViewId && [
            <script
              async
              key='gTagSrc'
              src={`https://www.googletagmanager.com/gtag/js?id=${gaViewId}`}
            />,
            <script
              dangerouslySetInnerHTML={{__html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaViewId}');
              `.replace(/\s+/g, ' ')}}
              key='gTagInit'
            />
          ]}

          <link
            rel='stylesheet'
            href='/static/css/tachyons.min.css'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Montserrat:600|Open+Sans'
          />

          <title>{title || 'Home'}</title>
        </Head>

        <WithMobileMenu>
          <Hero {...hero} />

          <NewsletterSignUp />

          <main>
            {children}
          </main>

          <Footer />
        </WithMobileMenu>

        {theme && theme.emailModalGate && <NewsletterGate />}

        {/* additional tags and classes */}
        <style
          global
          jsx
        >{`
          html, body { font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', sans-serif }
          .container { margin: 0 1em; max-width: 62em }
          .f-title { font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', sans-serif }
          .hover-b--white:focus, .hover-b--white:hover { border-color: #fff }
          .no-p-m > p { margin: 0 }
          .of-c { object-fit: cover }
          .op-ct { object-position: center top }
          .v-center { top: 50%; transform: translateY(-50%) }
          .touch { -webkit-overflow-scrolling: touch }

          @media (min-width: 64em) {
            .container { margin: 0 auto }
          }
        `}</style>

        {/* additional primary color classes */}
        <style
          global
          jsx
        >{`
          .b--primary { border-color: ${primaryHex} }
          .bg-primary { background-color: ${primaryHex} }
          .hover-bg-primary:hover, .hover-bg-primary:focus { background-color: ${primaryHex} }
          .primary { color: ${primaryHex} }
        `}</style>
      </div>
    )
  }
}

export default graphql(gql(`
  query {
    theme (id: "${themeId}") {
      emailModalGate
      gaViewId
      primaryHex
    }
  }
`))(Page)
