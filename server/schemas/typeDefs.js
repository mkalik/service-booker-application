const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        tickets: [Ticket]!
    }
    type Ticket {
        _id: ID
        ticketTitle: String
        ticketContent: String
        ticketBudget: String
        ticketStatus: Boolean
        ticketCreator: String
        ticketComments: [Comment]
    }
    type Comment {
        _id: ID
        ticketId: String!
        username: String
        commentText: String!
    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(profileId: ID!): User
        tickets(ticketCreator: String!, privilege: String): [Ticket]
        getSingleTicket(ticketId: String): Ticket
        #if we get to employee portion we can add something to query all users
    }
    type Mutation {
        #need to add one for adding comments
        addUser(
            username: String!
            email: String!
            password: String!
            privilege: String!
        ): Auth
        ticketToggle(ticketId: String!, status: Boolean!): Ticket
        login(email: String!, password: String!): Auth

        addTicket(
            ticketTitle: String!
            ticketContent: String!
            ticketBudget: String
            ticketStatus: Boolean!
            ticketCreator: String!
        ): Ticket
        #updateTicket(id: String!, input: InfoTicket): Ticket
        #deleteTicket(id: String!): [Ticket]
        addComment(
            ticketId: String!
            username: String!
            commentText: String!
        ): Ticket
    }
`;

module.exports = typeDefs;
