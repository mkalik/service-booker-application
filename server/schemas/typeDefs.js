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
        #ticketComment: [Comments]
    }
    #    type Comments {
    #        _id: ID
    #        ticketId: String!
    #        username: String!
    #        commentText: String!
    #    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(profileId: ID!): User
        tickets(username: String): [Ticket]
        getSingleTicket(id: String): Ticket
        #if we get to employee portion we can add something to query all users
    }
    type Mutation {
        #need to add one for adding comments
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        addTicket(
            ticketTitle: String!
            ticketContent: String!
            ticketBudget: String
            ticketStatus: Boolean!
            ticketCreator: String!
        ): Ticket
        #updateTicket(id: String!, input: InfoTicket): Ticket
        deleteTicket(id: String!): [Ticket]
    }
`;

module.exports = typeDefs;
