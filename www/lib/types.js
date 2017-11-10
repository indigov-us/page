// @flow

export type Post = {
  author: {
    name: string
  },
  featuredImage?: {
    altText: string,
    sourceUrl: string
  },
  id: string,
  link: string,
  title: string
}
