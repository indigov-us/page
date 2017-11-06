// @flow

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const errorMessage = require('./lib/error-message')
const {createTicket} = require('./lib/zendesk')
const WPBlog = require('./models/wp-blog')
const WPBlogOption = require('./models/wp-blog-option')

const app = new Koa()

const validChannels = ['web-form']

// channels: email, web form, phone, twitter, facebook, sms
// senders:
//   email:
//     name:
//     email:
//   web form:
//     name:
//     email:
//   phone: number
//   twitter: username
//   facebook: username
//   sms: number

app.use(bodyParser())

app.use(async ctx => {
  // find the site by hostname (e.g., czahor.house.dev)
  const {host} = ctx
  const hostWithoutProtocol = host.replace(/:\d+/, '') // for dev, e.g., czahor.house.dev:3000
  const blog = await WPBlog.findOne({where: {domain: hostWithoutProtocol}})
  if (!blog) return errorMessage(404, `Site not found for host "${hostWithoutProtocol}"`, {ctx})

  // parse the incoming message
  const body: any = ctx.request.body
  const {channel, message, sender} = body
  if (!channel) return errorMessage(400, 'Missing :channel', {ctx})
  if (!validChannels.includes(channel)) return errorMessage(400, `Invalid :channel "${channel}", valid options are "${validChannels.join('|')}"`, {ctx})

  // get the zendesk credentials
  const WPOption = WPBlogOption(blog.blogId)
  const zendeskAccessTokenOption = await WPOption.findOne({where: {optionName: 'zendesk_access_token'}})
  if (!zendeskAccessTokenOption) return errorMessage(400, 'Missing zendesk_access_token setting', {ctx})
  const zendeskEmailAdressOption = await WPOption.findOne({where: {optionName: 'zendesk_email_address'}})
  if (!zendeskEmailAdressOption) return errorMessage(400, 'Missing zendesk_email_address setting', {ctx})
  const zendeskSubdomainOption = await WPOption.findOne({where: {optionName: 'zendesk_subdomain'}})
  if (!zendeskSubdomainOption) return errorMessage(400, 'Missing zendesk_subdomain setting', {ctx})

  // create the ticket
  const ticket = await createTicket({
    channel,
    message,
    sender,
    accessToken: zendeskAccessTokenOption.optionValue,
    emailAddress: zendeskEmailAdressOption.optionValue,
    subdomain: zendeskSubdomainOption.optionValue
  })

  ctx.body = `Created ticket id=${ticket.id}`
})

app.listen(3000)
