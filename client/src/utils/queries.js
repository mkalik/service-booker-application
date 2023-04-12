import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            tickets {
                _id
                ticketTitle
                ticketContent
                ticketBudget
                ticketStatus
            }
        }
    }
`;

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
            }
        }
    }
`;

//need a query for just comments - this is reather essential for the comments components
export const GET_COMMENTS = gql`
    query getSingleTicket($ticketId: String!) {
        getSingleTicket(ticketId: $ticketId) {
            ticketComments {
                commentText
                username
            }
        }
    }
`;
