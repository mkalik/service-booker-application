const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        tickets: [Ticket]
    }
    type Ticket {
        _id: ID
        ticketTitle: String
        ticketContent: String
        ticketBudget: Float
        ticketStatus: Boolean
        ticketCreator: User
    }
    input InfoTicket {
        ticketTitle: String
        ticketContent: String
        ticketBudget: Float
        ticketStatus: Boolean
    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        getTickets: [Ticket]
        getSingleTicket(id: String): Ticket

        #if we get to employee portion we can add something to query all users
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addTicket(input: InfoTicket!): User
        #updateTicket(id: String!, input: InfoTicket): Ticket
        deleteTicket(id: String!): Ticket
    }
`;

module.exports = typeDefs;
