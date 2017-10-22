// @flow

import React from 'react'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import Contact from '../components/contact'
import Page from '../components/page'

export const ContactPage = () => (
  <Page title='Contact'>
    <Contact />
  </Page>
)

ContactPage.displayName = 'ContactPage'

export default WithCustomized(WithApollo(ContactPage))
