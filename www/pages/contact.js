// @flow

import React from 'react'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import Contact from '../components/contact'
import Page from '../components/page'

export const ContactPage = () => (
  <Page
    heroProps={{
      description: "My staff and I love hearing from those we've dedicated our careers to representing.",
      showSearch: false,
      title: 'Contact My Office'
    }}
    title='Contact'
  >
    <div className='container'>
      <Contact />
    </div>
  </Page>
)

ContactPage.displayName = 'ContactPage'

export default WithCustomized(WithApollo(ContactPage))
