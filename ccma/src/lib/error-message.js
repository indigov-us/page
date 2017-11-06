// @flow

import type {Context} from 'koa'

module.exports = (status: number, message: string, {ctx}: {ctx: Context}) => {
  ctx.status = status
  ctx.body = message
}
