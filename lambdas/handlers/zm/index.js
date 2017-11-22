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

export type ZendeskUser = {
  id?: number,
  external_id: string | number,
  name: string,
  user_fields: {
    first_name: string
  }
}

export type ZendeskEndpointKey = 'users'

type ZendeskEndpoints = {
  [ZendeskEndpointKey]: {
    path: string,
    rootKey: string
  }
}

const zendeskEndpoints: ZendeskEndpoints = {
  users: {
    path: '/api/v2/users/create_or_update_many.json',
    rootKey: 'users'
  }
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
  const [CRMName, zendeskSubdomain, dataCategory] = s3Key.split('/')

  // set up an error handler/logger
  const createError = (message: string) => {
    console.error(`[ERROR] file: ${bucket}/${s3Key}, "${message}"`)
    return callback(new Error(message))
  }

  // get the zendesk credentials from the file
  const {accessToken, email} = credentials[zendeskSubdomain]
  if (!accessToken) return createError('missing access token')
  if (!email) return createError('missing email')

  // get the appropriate transformer
  const transformer = transformers[CRMName][dataCategory]
  if (!transformer) return createError('invalid CRM folder')
  const {columns, fn, zendeskEndpointKey} = transformer

  // download the file
  const s3 = new S3()
  const data = await s3.getObject({Bucket: bucket, Key: s3Key}).promise()

  // convert the file to an array of objects and transform into zendesk objects
  const {path, rootKey} = zendeskEndpoints[zendeskEndpointKey]
  const objects: Array<ZendeskUser> = parse(data.Body.toString(), {columns}).map(fn)

  // send the bulk import request to zendesk
  const url = `https://${zendeskSubdomain}.zendesk.com${path}`
  const encodedCredentials = Buffer.from(`${email}/token:${accessToken}`).toString('base64')
  const headers = {Authorization: `Basic ${encodedCredentials}`, 'Content-Type': 'application/json'}
  try {
    const res = await post(url, {[rootKey]: objects}, {headers})
    return callback(null, res.data)
  } catch (e) {
    return createError(e.message)
  }
}
