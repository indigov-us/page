// @flow

import type {
  ZendeskEndpointKey,
  ZendeskOrganization,
  ZendeskUser
} from './'

type Transformers = {
  [string]: {
    [string]: {
      columns: Array<string>,
      fn: Object => ZendeskUser | ZendeskOrganization | string,
      pathFnOpts?: Object,
      zendeskEndpointKey: ZendeskEndpointKey
    }
  }
}

const transformers: Transformers = {
  'house-cms-data-interchange': {
    '1A': {
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
      fn: ({constituentId, firstName, middleName, lastName}): ZendeskUser => ({
        external_id: constituentId,
        name: [firstName, middleName, lastName].join(' '),
        user_fields: {
          first_name: firstName
        }
      }),
      zendeskEndpointKey: 'users'
    },
    '1B': {
      columns: [
        'recordType',
        'constituentId', 
        'addressId',
        'addressType',
        'primaryFlag',
        'defaultAddressFlag',
        'title',
        'name',
        'addressLine1',
        'addressLine2',
        'addressLine3',
        'addressLine4',
        'zipCode',
        'carrierRoute',
        'county',
        'country',
        'district',
        'precinct',
        'noMailFlag',
        'agencyCode'
      ],
      fn: ({addressId}): ZendeskOrganization => ({
        external_id: addressId
      }),
      zendeskEndpointKey: 'organizations'
    },
    '1C': {
      columns: [
        'recordType',
        'constituentId',
        'type',
        'code'
      ],
      fn: ({type, code}) => `${type} - ${code}`,
      pathFnOpts: ({object: 'users'}),
      zendeskEndpointKey: 'tags'
    }
  }
}

export default transformers
