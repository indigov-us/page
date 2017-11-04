// @flow

import React, {Component} from 'react'

type Props = {
  username: string
}

class TwitterTimeline extends Component<Props> {
  componentDidMount () {
    const {body} = document
    const el = document.createElement('script')
    el.async = true
    el.charset = 'utf-8'
    el.src = 'https://platform.twitter.com/widgets.js'
    if (body) body.appendChild(el)
  }

  render () {
    const {username} = this.props
    return (
      <div
        dangerouslySetInnerHTML={{__html:
  `<a class='twitter-timeline' href='https://twitter.com/${username}'>Tweets by ${username}</a>`
        }}
      />
    )
  }
}

export default TwitterTimeline
