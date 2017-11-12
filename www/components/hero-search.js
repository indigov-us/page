// @flow

import gql from 'graphql-tag'
import Autocomplete from 'react-autocomplete'
import React, {Component} from 'react'
import {graphql} from 'react-apollo'

import type {Page, Post} from '../lib/types'
import {formattedExcerpt} from '../lib/formatter'
import fragments from '../lib/fragments'
import {updateS} from '../states/hero-search'

type Props = {
  data: {
    fetchMore: any => any,
    pages?: {
      edges: Array<{
        node: Page
      }>
    },
    posts?: {
      edges: Array<{
        node: Post
      }>
    }
  }
}

export type State = {
  q?: ?string
}

class HeroSearch extends Component<Props, State> {
  constructor () {
    super()
    this.state = {}
  }

  componentDidUpdate () {
    const {data} = this.props
    const {q} = this.state

    data.fetchMore({
      variables: {q},
      updateQuery: (prevResult, {fetchMoreResult}) => fetchMoreResult
    })
  }

  buildItems = () => {
    const {data} = this.props

    let items = []
    for (let type of ['pages', 'posts']) {
      if (data && data[type] && data[type].edges.length) {
        items = items.concat(data[type].edges)
      }
    }

    return items
  }

  render () {
    const {q} = this.state

    return (
      <Autocomplete
        className='black'
        getItemValue={({node: {title}}) => title}
        inputProps={{
          className: 'br-pill pv2 ph3 f4 db w-100 border-box',
          placeholder: 'Can you please expedite my passport...'
        }}
        items={this.buildItems()}
        menuStyle={{
          background: 'rgba(255, 255, 255, 0.98)',
          border: '1px solid #ccc',
          fontSize: '0.875rem',
          left: 0,
          position: 'absolute',
          overflow: 'auto',
          top: 'auto',
          width: '100%',
          zIndex: '1'
        }}
        onChange={e => this.setState(updateS(e.target.value))}
        renderItem={({node: {excerpt, featuredImage, link, id, title}}: {node: Page}, isHighlighted) =>
          <a
            className='black db pa2 dim bb no-underline b--moon-gray tl truncate'
            key={id}
            href={link}
          >
            <img
              className='v-mid pr1'
              height={20}
              src={featuredImage && featuredImage.sourceUrl}
              width={20}
            />
            <span className='b pr1'>{title}</span>
            <span
              className='gray'
              dangerouslySetInnerHTML={{__html: formattedExcerpt(excerpt)}}
            />
          </a>
        }
        value={q}
        wrapperProps={{className: 'black w-70-m w-50-l center relative'}}
        wrapperStyle={{}}
      />
    )
  }
}

export default graphql(gql(`
  query ($q: String) {
    pages (where: {search: $q}) {
      edges {
        node {
          ...page
        }
      }
    }
    posts (where: {search: $q}) {
      edges {
        node {
          ...post
        }
      }
    }
  }
  ${fragments.page}
  ${fragments.post}
`), {
  options (props) {
    return {
      variables: {
        q: props.q
      }
    }
  },
  props (props) {
    return props
  }
})(HeroSearch)
