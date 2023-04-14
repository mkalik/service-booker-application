import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $privilege: String!) {
        addUser(username: $username, email: $email, password: $password, privilege: $privilege) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_TICKET = gql`
    mutation addTicket(
        $ticketTitle: String!
        $ticketContent: String!
        $ticketBudget: String
        $ticketStatus: Boolean!
        $ticketCreator: String!
    ) {
        addTicket(
            ticketTitle: $ticketTitle
            ticketContent: $ticketContent
            ticketBudget: $ticketBudget
            ticketStatus: $ticketStatus
            ticketCreator: $ticketCreator
        ) {
            _id
            ticketTitle
            ticketContent
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation AddComment(
        $ticketId: String!
        $username: String!
        $commentText: String!
    ) {
        addComment(
            ticketId: $ticketId
            username: $username
            commentText: $commentText
        ) {
            ticketComments {
                _id
                ticketId
                username
                commentText
            }
        }
    }
`;
