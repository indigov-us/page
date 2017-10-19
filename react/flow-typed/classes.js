import {ClientRequest} from 'http'

declare class ClientRequestWithSession extends ClientRequest {
  session: Object
}
