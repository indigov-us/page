// @flow

import classNames from 'classnames'
import dateFormat from 'dateformat'
import React from 'react'

import type {Post} from '../lib/types'

type Props = {
  excerptClassName?: string,
  leftColClassName?: string,
  post: Post & {
    excerpt: string
  },
  rightColClassName?: string,
  titleTagName?: string
}

const GridItemPost = ({excerptClassName, leftColClassName, post: {date, excerpt, id, featuredImage, link, terms, title}, rightColClassName, titleTagName}: Props) => {
  const TitleTag: any = titleTagName

  return (
    <div className='cf h-inherit-ns overflow-hidden'>
      <div
        className={classNames(
          'fl w-100 h-inherit-ns mb3 mb0-ns',
          leftColClassName
        )}
      >
        <a
          className='db h-inherit-ns'
          href={link}
        >
          <img
            className='db of-c h-inherit-ns w-100 op-ct bg-light-gray'
            src={featuredImage && featuredImage.sourceUrl}
          />
        </a>
        <style jsx>{`
          img { height: 200px }
          @media (min-width: 30em) {
            img { height: inherit }
          }
        `}</style>
      </div>
      <div
        className={classNames(
          'fl w-100 h-inherit-ns',
          rightColClassName
        )}
      >
        <div className='ph3-ns'>
          <TitleTag className='mt0 mb2'>
            <a
              className='black no-underline'
              href={link}
            >
              {title}
            </a>
          </TitleTag>
          <div className='gray'>
            <span>{dateFormat(date, 'mmmm d, yyyy')}</span>
            {terms.slice(0, 1).map(({id, link, name}) => (
              <span key={id}>
                <span>{' - '}</span>
                <a
                  className='gray'
                  href={link}
                >
                  {name}
                </a>
              </span>
            ))}
          </div>
          <div
            className={classNames('lh-title', excerptClassName)}
            dangerouslySetInnerHTML={{__html: excerpt}}
          />
        </div>
      </div>
    </div>
  )
}

GridItemPost.defaultProps = {
  excerptClassName: 'gray',
  leftColClassName: 'w-50-ns',
  rightColClassName: 'w-50-ns',
  titleTagName: 'h3'
}

export default GridItemPost
