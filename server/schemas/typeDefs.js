const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User{
        _id:ID
        name: String
        tickets:[Ticket]
    }
    type Ticket{
        _id: ID
        title: String
        user:User
    }
    type Query{

        me:User
        #if we get to employee portion we can add something to query all users
    }
    type Mutation{}
`;

module.exports = typeDefs;
