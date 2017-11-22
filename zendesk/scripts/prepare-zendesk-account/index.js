const argv = require('argv')
const axios = require('axios')

// set up -h
argv.option([{
  description: 'The email for the Zendesk account',
  name: 'email',
  short: 'e',
  type: 'string'
}, {
  description: 'The access token for the Zendesk account',
  name: 'accessToken',
  short: 't',
  type: 'string'
}, {
  description: 'The subdomain the Zendesk account',
  name: 'subdomain',
  short: 's',
  type: 'string'
}]).run()

// get and validate arguments
const {options: {email, accessToken, subdomain}} = argv.run()
if (!email) throw new Error('missing email (-e)')
if (!accessToken) throw new Error('missing accessToken (-t)')
if (!subdomain) throw new Error('missing subdomain (-s)')

// set up default fetch config
const encodedCredentials = Buffer.from(`${email}/token:${accessToken}`).toString('base64')
axios.defaults.headers.common.Authorization = `Basic ${encodedCredentials}`
axios.defaults.headers.common['Content-Type'] = 'application/json'

// set up fetch function
const fetch = async (axiosOpts, opts) => {
  axiosOpts.url = `https://${subdomain}.zendesk.com${axiosOpts.url}`

  try {
    console.log(`${opts.message}... `)
    const res = await axios(axiosOpts)
    console.log(`${opts.message} success! `)
    return res.data
  } catch (e) {
    console.log(`${opts.message} error: "${e.message}"`)
  }
}

// create the user fields
for (let {data, message} of require('./user-fields')) {
  fetch({method: 'POST', url: '/api/v2/user_fields.json', data}, {message})
}
