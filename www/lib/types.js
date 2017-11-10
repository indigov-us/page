// @flow

export type Post = {
  author: {
    name: string
  },
  date: string,
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
