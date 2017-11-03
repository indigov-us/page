// @flow

import Autocomplete from 'react-autocomplete'
import React, {Component} from 'react'
import {gql, graphql} from 'react-apollo'

import {updateS} from '../states/hero-search'

type Props = {
  data?: {
    fetchMore: any => any,
    posts?: {
      edges: Array<{
        node: {
          title: string
        }
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

    if (data) {
      data.fetchMore({
        variables: {q},
        updateQuery: (prevResult, {fetchMoreResult}) => fetchMoreResult
      })
    }
  }

  render () {
    const {data} = this.props
    const {q} = this.state

    return (
      <Autocomplete
        className='black'
        getItemValue={({node: {slug}}) => slug}
        inputProps={{
          className: 'br-pill pv2 ph3 f4 db w-100 border-box',
          placeholder: 'Can you please expedite my passport...'
        }}
        items={data && data.posts && data.posts.edges}
        onChange={e => this.setState(updateS(e.target.value))}
        renderItem={({node: {id, title}}, isHighlighted) =>
          <div
            className='black'
            key={id}
          >
            {title}
          </div>
        }
        value={q}
        wrapperProps={{className: 'black w-70-m w-50-l center'}}
        wrapperStyle={{}}
      />
    )
  }
}

export default graphql(gql(`
  query ($q: String) {
    posts (
      where: {search: $q}
    ) {
      edges {
        node {
          author {
            name
          }
          content
          excerpt
          featuredImage {
            altText
            sourceUrl
          }
          id
          postId
          slug
          title
        }
      }
    }
  }
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
