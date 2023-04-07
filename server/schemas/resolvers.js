const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Ticket, User } = require('../models');

const resolvers = {
    Query: {},
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError("No user was found");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError("Incorrect Credentials, Try Again");
            }
            const token = signToken(user);
            return { token, user };
          },
          addTicket: async(parent, {ticketTitle}) => {
            const ticket = await Ticket.create({
              ticketTitle
            });
            return ticket
          },
    },
};

module.exports = resolvers;
