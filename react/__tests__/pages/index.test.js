/* eslint-env jest */
// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import HomePage from '../../pages/index'

describe('With Snapshot Testing', () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(
      <HomePage
        composedProps={{}}
        customized={{}}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
