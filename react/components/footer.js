// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'

import Office from '../components/office'

type Props = {
  data?: {
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

const Footer = ({data}: Props) => (
  <footer className='bg-dark-gray white'>
    <div className='container'>
      {data && data.offices && data.offices.edges.length > 0 && (
        <div>
          <h2 className='pt4'>{'Offices'}</h2>
          <div className='cf nl2-ns nr2-ns'>
            {data && data.offices && data.offices.edges.map(({node}) => (
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
      <div className='mb3'>
        <form
          action='/search'
          method='GET'
        >
          <input
            name='q'
            placeholder='Search'
            type='text'
          />
        </form>
      </div>

      <div>
        {'footer'}
      </div>
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
