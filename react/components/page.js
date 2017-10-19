// @flow

import Head from 'next/head'
import React from 'react'

import Footer from '../components/footer'
import Hero from '../components/hero'
import type {Props as HeroProps} from '../components/hero'
import NewsletterSignUp from '../components/newsletter-sign-up'

type Props = {
  children: any,
  hero?: HeroProps,
  title?: string
}

const Page = ({children, hero, title}: Props) => (
  <div>
    <Head>
      <meta
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
        name='viewport'
      />
      <link
        rel='stylesheet'
        href='/static/css/tachyons.min.css'
      />

      <title>{title || 'Home'}</title>
    </Head>

    <div className='helvetica'>
      <Hero {...hero} />

      <NewsletterSignUp />

      <main>
        {children}
      </main>

      <Footer />
    </div>

    <style
      global
      jsx
    >{`
      .container {
        margin: 0 16px;
        max-width: 992px;
        @media (min-width: 1024px) { margin: 0 auto }
      }
      .no-p-m > p { margin: 0 }
    `}</style>
  </div>
)

Page.displayName = 'Page'

export default Page
