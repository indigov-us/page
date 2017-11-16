// @flow

import {post} from 'axios'
import {S3, config as AWSConfig, SharedIniFileCredentials} from 'aws-sdk'
import parse from 'csv-parse/lib/sync'

import credentials from './credentials'
import transformers from './transformers'

type Event = {
  Records: Array<{
    s3: {
      bucket: {
        name: string
      },
      object: {
        key: string
      }
    }
  }>
}

export type ZendeskObject = {
  comments: Array<{
    value: string
  }>,
  external_id: string | number
}

// for local development, use the saved AWS credentials
if (process.env.NODE_ENV === 'development') {
  const indigovProfile = new SharedIniFileCredentials({profile: 'indigovern'})
  AWSConfig.credentials = indigovProfile
}

export default async function (event: Event, context: Object, callback: (any, ?any) => any) {
  // parse the event to get the zendesk subdomain, name of CRM, and path to data file
  const bucket = event.Records[0].s3.bucket.name
  const s3Key = event.Records[0].s3.object.key
  const [CRMName, zendeskSubdomain] = s3Key.split('/')

  // fetch the zendesk credentials from the wordpress database
  const {accessToken, email} = credentials[zendeskSubdomain]
  if (!accessToken) return callback('missing access token')
  if (!email) return callback('missing email')

  // get the appropriate transformer
  const transformer = transformers[CRMName]
  if (!transformer) return callback('invalid CRM folder')
  const {columns, fn} = transformer

  // download the file
  const s3 = new S3()
  const data = await s3.getObject({Bucket: bucket, Key: s3Key}).promise()

  // convert the file to an array of objects and transform into zendesk tickets
  const tickets: Array<ZendeskObject> = parse(data.Body.toString(), {columns}).map(fn)

  // send the bulk import request to zendesk
  const url = `https://${zendeskSubdomain}/api/v2/imports/tickets/create_many.json`
  const encodedCredentials = Buffer.from(`${email}/token:${accessToken}`).toString('base64')
  const headers = {Authorization: `Basic ${encodedCredentials}`, 'Content-Type': 'application/json'}
  try {
    const res = await post(url, {tickets}, {headers})
    return callback(null, res.data)
  } catch (e) {
    return callback(e)
  }
}
