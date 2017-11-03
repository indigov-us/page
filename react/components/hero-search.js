// @flow

import Autocomplete from 'react-autocomplete'
import React, {Component} from 'react'
import {gql, graphql} from 'react-apollo'

import {updateS} from '../states/hero-search'

type Props = {
  data?: {
    fetchMore: any => any,
    pages?: {
      edges: Array<{
        node: {
          id: string,
          link: string,
          title: string
        }
      }>
    },
    posts?: {
      edges: Array<{
        node: {
          id: string,
          link: string,
          title: string
        }
      }>
    },
    questions?: {
      edges: Array<{
        node: {
          id: string,
          link: string,
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

  buildItems = () => {
    const {data} = this.props

    let items = []
    for (let type of ['pages', 'posts', 'questions']) {
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
        onChange={e => this.setState(updateS(e.target.value))}
        renderItem={({node: {link, id, title}}, isHighlighted) =>
          <a
            className='black db pv2 dim bb no-underline b--moon-gray'
            href={link}
            key={id}
          >
            {title}
          </a>
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
    pages (where: {search: $q}) {
      edges {
        node {
          id
          link
          title
        }
      }
    }
    posts (where: {search: $q}) {
      edges {
        node {
          id
          link
          title
        }
      }
    }
    questions (where: {search: $q}) {
      edges {
        node {
          id
          link
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
