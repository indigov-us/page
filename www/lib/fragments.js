// @flow

export default {
  page:
    `fragment page on Page {
      date
      excerpt
      featuredImage {
        altText
        sourceUrl
      }
      id
      link
      title
    }`,
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
