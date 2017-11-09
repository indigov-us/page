// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import WithSidebar from '../hoc/with-sidebar'
import Grid from '../components/grid'
import Page from '../components/page'

type Categories = {
  edges: Array<{
    node: {
      children: {
        edges: Array<{
          node: {
            children: {
              edges: Array<{
                node: {
                  id: string,
                  link: string,
                  name: string,
                  slug: string
                }
              }>
            },
            id: string,
            link: string,
            name: string,
            slug: string
          }
        }>
      },
      id: string,
      link: string,
      name: string,
      slug: string
    }
  }>
}

type Props = {
  data: {
    categories?: Categories,
    posts?: {
      edges: Array<{
        node: {
          excerpt: string,
          id: string,
          link: string,
          title: string
        }
      }>
    }
  },
  query: {
    subcategories: string
  }
}

const getCategoryFromTree = (categories?: Categories, {subcategories}: {subcategories: string}) => {
  // category not found
  if (!categories || !categories.edges.length) return

  // e.g., /category/primary
  let {node} = categories.edges[0]
  if (!subcategories) return node

  // e.g., /category/primary/secondary or /category/primary/secondary/tertiary
  for (let subcategory of subcategories.split('/')) {
    const child: any = node.children.edges.find(({node: {slug}}) => slug === subcategory)
    if (!child) break
    node = child.node
  }

  return node
}

const CategoryPage = ({data: {categories, posts}, query: {subcategories}}: Props) => {
  const node = getCategoryFromTree(categories, {subcategories})

  return (
    <Page
      title={node && node.name}
    >
      <WithSidebar>
        {node && (
          <div>
            <h1 className='mb2 f-title'>
              <a
                className='black no-underline'
                dangerouslySetInnerHTML={{__html: node.name}}
                href={node.link}
              />
            </h1>

            <h2>{'Subcategories'}</h2>
            {node.children && node.children.edges.map(({node: {id, link, name}}) => (
              <div key={id}>
                <a href={link}>
                  {name}
                </a>
              </div>
            ))}
          </div>
        )}

        <Grid
          items={posts && posts.edges}
          title='Articles'
        />
      </WithSidebar>
    </Page>
  )
}

CategoryPage.displayName = 'CategoryPage'

export default WithCustomized(WithApollo(graphql(gql(`
  fragment categoryFields on Category {
    id
    link
    name
    slug
  }

  query ($slug: String, $exactSlug: String) {
    categories (
      first: 1,
      where: {
        slug: [$slug]
      }
    ) {
      edges {
        node {
          children {
            edges {
              node {
                children {
                  edges {
                    node {
                      ...categoryFields
                    }
                  }
                }
                ...categoryFields
              }
            }
          }
          ...categoryFields
        }
      }
    }
    posts (
      first: 10,
      where: {categoryName: $exactSlug}
    ) {
      edges {
        node {
          excerpt
          id
          link
          title
        }
      }
    }
  }
`), {
  options: ({query: {slug, subcategories}}: {query: {slug: string, subcategories: ?string}}) => {
    return {
      variables: {
        exactSlug: subcategories ? subcategories.split('/').slice(-1)[0] : slug,
        slug
      }
    }
  }
})(CategoryPage)))
