import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      tickets {
        _id
        ticketTitle
        ticketContent
        ticketBudget
        ticketStatus
        ticketCreator
      }
    }
  }
`;