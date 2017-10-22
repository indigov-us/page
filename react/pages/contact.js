// @flow

import React from 'react'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import ContactComponent from '../components/contact'
import Page from '../components/page'

export const Contact = () => (
  <Page title='Contact'>
    <ContactComponent />
  </Page>
)

Contact.displayName = 'Contact'

export default WithCustomized(WithApollo(Contact))
