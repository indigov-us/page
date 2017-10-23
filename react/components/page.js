// @flow

import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'
import {gql, graphql} from 'react-apollo'

import Footer from '../components/footer'
import Hero from '../components/hero'
import type {Props as HeroProps} from '../components/hero'
import NewsletterSignUp from '../components/newsletter-sign-up'
import WithMobileMenu from '../hoc/with-mobile-menu'
import {defaultPrimaryHex, themeId} from '../lib/theme'

type Props = {
  children: any,
  data?: {
    theme?: {
      primaryHex: ?string
    }
  },
  hero?: HeroProps,
  title?: string
}

type Context = {
  customized?: {
    primary_hex?: string
  }
}

const Page = ({children, data, hero, title}: Props, {customized}: Context) => {
  const primaryHex = (customized && customized.primary_hex) || (data && data.theme && data.theme.primaryHex) || defaultPrimaryHex

  return (
    <div>
      <Head>
        <meta
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
          name='viewport'
        />

        {/* google analytics */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=UA-108351158-1'
        />
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-108351158-1');
        `}}
        />

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
        .v-center { top: 50%; transform: translateY(-50%) }

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

Page.contextTypes = {
  customized: PropTypes.object
}

Page.displayName = 'Page'

export default graphql(gql(`
  query {
    theme (id: "${themeId}") {
      primaryHex
    }
  }
`))(Page)
