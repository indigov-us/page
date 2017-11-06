// @flow

import {Router} from '../routes'
import URL from 'url'

export default (page: string, args?: Object) => {
  return Router.linkPage(...(
    /https?:\/\//.test(page) ? extractPageAndArgsFromLink(page) : [page, args]
  ))
}

const extractPageAndArgsFromLink = (link: string) => {
  let page, args

  const url = URL.parse(link)
  const match = url.pathname.match(/\/(.+?)\/(.+?)(?:\/|$)/)

  if (!match) {
    page = '/'
  } else {
    const [, prefix, slug] = match
    switch (prefix) {
      case 'articles':
        page = 'article'
        args = {idSlug: slug}
        break
      case 'pages':
        page = 'page'
        args = {slug}
        break
      case 'questions':
        page = 'question'
        args = {idSlug: slug}
        break
    }
  }

  return [page, args]
}
