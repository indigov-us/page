// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import Grid from '../components/grid'
import Page from '../components/page'
import fragments from '../lib/fragments'
import {themeId} from '../lib/theme'
import TwitterTimeline from '../components/twitter-timeline'

type Props = {
  data: {
    pages?: {
      edges: Array<{
        node: {
          excerpt: string,
          id: string,
          link: string,
          title: string
        }
      }>
    },
    posts?: {
      edges: Array<{
        node: {
          excerpt: string,
          id: string,
          link: string,
          title: string
        }
      }>
    },
    theme?: {
      twitterUsername: ?string
    }
  }
}

const HomePage = ({data: {pages, posts, theme}}: Props) => {
  return (
    <Page
      hero={{showQuickLinks: true}}
      title='Home'
    >
      <div className='container'>
        <Grid
          items={posts && posts.edges}
          title='Articles'
        />

        <Grid
          items={pages && pages.edges}
          title='Pages'
        />

        {theme && theme.twitterUsername && <TwitterTimeline username={theme.twitterUsername} />}
      </div>
    </Page>
  )
}

HomePage.displayName = 'HomePage'

export default WithCustomized(WithApollo(graphql(gql(`
  query {
    pages {
      edges {
        node {
          excerpt
          id
          link
          title
        }
      }
    }
    posts (first: 5) {
      edges {
        node {
          ...post
        }
      }
    }
    theme (id: "${themeId}") {
      twitterUsername
    }
  }
  ${fragments.post}
`))(HomePage)))
