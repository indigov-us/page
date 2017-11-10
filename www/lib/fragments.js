// @flow

export default {
  post:
    `fragment post on Post {
      author {
        name
      }
      excerpt
      featuredImage {
        altText
        sourceUrl
      }
      id
      link
      title
    }`
}
