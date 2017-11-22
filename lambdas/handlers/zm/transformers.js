// @flow

import type {
  ZendeskEndpointKey,
  ZendeskUser
} from './'

type Transformers = {
  [string]: {
    [string]: {
      columns: Array<string>,
      fn: Object => ZendeskUser,
      zendeskEndpointKey: ZendeskEndpointKey
    }
  }
}

const transformers: Transformers = {
  'house-cms-data-interchange': {
    constituents: {
      columns: [
        'recordType',
        'constituentId',
        'individualType',
        'prefix',
        'firstName',
        'middleName',
        'lastName',
        'suffix',
        'appellation',
        'salutation',
        'birthday',
        'noMailFlag',
        'deceasedFlag'
      ],
      fn: ({constituentId, firstName, middleName, lastName}) => ({
        external_id: constituentId,
        name: [firstName, middleName, lastName].join(' '),
        user_fields: {
          first_name: firstName
        }
      }),
      zendeskEndpointKey: 'users'
    }
  }
}

export default transformers
