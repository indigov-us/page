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
  const pathParts = url.pathname.split('/')

  if (pathParts.length === 3) {
    if (pathParts[1] === 'category') {
      page = 'category'
      args = {slug: pathParts[2]}
    } else {
      page = 'article'
      args = {category: pathParts[1], idSlug: pathParts[2]}
    }
  } else if (pathParts.length === 2) {
    page = 'page'
    args = {slug: pathParts[1]}
  }

  return [page, args]
}
