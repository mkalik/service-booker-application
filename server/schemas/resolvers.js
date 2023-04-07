const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const { Ticket, User } = require('../models');
const resolvers = {
    Query: {
        me: async (parent, args, context) => {},
    },
    Mutation: {},
};

module.exports = resolvers;
