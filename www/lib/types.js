// @flow

export type Page = {
  date: string,
  excerpt: string,
  featuredImage: ?{
    altText: string,
    sourceUrl: string
  },
  id: string,
  link: string,
  title: string
}

export type Post = {
  author: {
    name: string
  },
  date: string,
  excerpt: string,
  featuredImage: ?{
    altText: string,
    sourceUrl: string
  },
  id: string,
  link: string,
  terms: Array<{
    id: string,
    link: string,
    name: string
  }>,
  title: string
}
