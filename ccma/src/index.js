// @flow

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const errorMessage = require('./lib/error-message')
const WPBlog = require('./models/wp-blog')

const app = new Koa()

const validChannels = ['web-form']

app.use(bodyParser())

app.use(async ctx => {
  // find the site by hostname (e.g., czahor.house.dev)
  const {host} = ctx
  const hostWithoutProtocol = host.replace(/:\d+/, '') // for dev, e.g., czahor.house.dev:3000
  const blog = await WPBlog.findOne({where: {domain: hostWithoutProtocol}})

  if (!blog) return errorMessage(404, `Site not found for host "${hostWithoutProtocol}"`, {ctx})

  // parse the incoming message
  const body: any = ctx.request.body
  const {channel} = body

  if (!channel) return errorMessage(400, 'missing :channel', {ctx})
  if (!validChannels.includes(channel)) return errorMessage(400, `invalid :channel "${channel}", valid options are "${validChannels.join('|')}"`, {ctx})

  ctx.body = {channel}
})

app.listen(3000)
