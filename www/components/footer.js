// @flow

import gql from 'graphql-tag'
import React from 'react'
import {graphql} from 'react-apollo'

import Office from '../components/office'

type Props = {
  data: {
    offices?: {
      edges: Array<{
        node: {
          id: string,
          street1: ?string,
          street2: ?string,
          city: ?string,
          state: ?string,
          title: ?string,
          zip: ?string,
          phone: ?string,
        }
      }>
    }
  }
}

const Footer = ({data: {offices}}: Props) => (
  <footer className='bg-dark-gray white'>
    <div className='container'>
      {offices && offices.edges.length > 0 && (
        <div>
          <h2 className='pt4'>{'Offices'}</h2>
          <div className='cf nl2-ns nr2-ns'>
            {offices && offices.edges.map(({node}) => (
              <div
                className='fl w-100 w-50-ns ph2-ns mb3 mb0-ns'
                key={node.id}
              >
                <Office {...node} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <hr className='mv4' />

    <div className='container pb4'>
      {'footer'}
    </div>
  </footer>
)

Footer.displayName = 'Footer'

export default graphql(gql(`
  query {
    offices {
      edges {
        node {
          id
          street1
          street2
          city
          state
          title
          zip
          phone
        }
      }
    }
  }
`))(Footer)
