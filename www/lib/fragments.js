// @flow

export default {
  post:
    `fragment post on Post {
      author {
        name
      }
      date
      excerpt
      featuredImage {
        altText
        sourceUrl
      }
      id
      link
      terms {
        ...on Category {
          id
          name
          link
        }
      }
      title
    }`
}
