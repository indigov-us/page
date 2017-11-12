// @flow

export const formattedExcerpt = (excerpt: string) => {
  return excerpt.replace(/<p>/, '').replace(/<\/p>/, '')
}
