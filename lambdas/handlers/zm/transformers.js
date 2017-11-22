// @flow

import type {ZendeskObject} from './'

type Transformers = {
  [string]: {
    [string]: {
      columns: Array<string>,
      fn: Object => ZendeskObject
    }
  }
}

const transformers: Transformers = {
  'house-cms-data-interchange': {
    constituents: {

    },
    correspondances: {

    },
    casework: {
      columns: ['id', 'title', 'description'],
      fn: ({id, title, description}) => ({
        comments: [{value: `${title} ${description}`}],
        external_id: id
      })
    },
    households: {

    },
    schedules: {

    }
  }
}

export default transformers
