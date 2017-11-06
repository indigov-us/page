// @flow

const axios = require('axios')

module.exports = {
  async createTicket ({channel, message, sender, accessToken, emailAddress, subdomain}: {channel: string, message: string, sender: string | Object, accessToken: string, emailAddress: string, subdomain: string}) {
    const url = `https://${subdomain}.zendesk.com/api/v2/tickets.json`
    const encodedCredentials = Buffer.from(`${emailAddress}/token:${accessToken}`).toString('base64')
    const headers = {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json'
    }

    const {data: {ticket}} = await axios.post(url, {ticket: {comment: 'the comment'}}, {headers})
    return ticket
  }
}
