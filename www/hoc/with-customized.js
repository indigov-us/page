// @flow

import PropTypes from 'prop-types'
import React, {Component} from 'react'

export default (ComposedComponent: any) => {
  type Props = {
    composedProps: Object,
    customized: Object
  }

  class WithCustomized extends Component<Props> {
    static childContextTypes = {
      customized: PropTypes.object
    }

    static getInitialProps = async ctx => {
      const composedInitialProps = ComposedComponent.getInitialProps
        ? await ComposedComponent.getInitialProps(ctx)
        : {}

      return {
        composedProps: composedInitialProps,
        customized: ctx.req && ctx.req.body && ctx.req.body.customized
          ? JSON.parse(ctx.req.body.customized)
          : {}
      }
    }

    getChildContext = () => ({
      customized: this.props.customized
    })

    render = () => <ComposedComponent {...this.props.composedProps} />
  }

  return WithCustomized
}
