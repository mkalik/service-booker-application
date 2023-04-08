const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User {
        _id:ID
        username: String
        email: String
        password: String
        tickets: [Ticket]!
    }
    type Ticket {
        _id: ID
        ticketTitle: String
        ticketContent: String
        ticketBudget: Float
        ticketStatus: Boolean
        ticketCreator: String
    }
    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me:User
        tickets(username: String): [Ticket]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addTicket(ticketTitle: String!): Ticket
    }
`;

module.exports = typeDefs;
