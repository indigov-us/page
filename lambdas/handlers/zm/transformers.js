// @flow

import type {ZendeskObject} from './'

type Transformers = {
  [string]: {
    columns: Array<string>,
    fn: Object => ZendeskObject
  }
}

const transformers: Transformers = {
  'test-crm': {
    columns: ['id', 'title', 'description'],
    fn: ({id, title, description}) => ({
      comments: [{value: `${title} ${description}`}],
      external_id: id
    })
  }
}

export default transformers
