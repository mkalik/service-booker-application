const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const { Ticket, User } = require('../models');
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            const user = await User.findOne({ _id: context.user._id });
            return user;
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user was found');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError(
                    'Incorrect Credentials, Try Again'
                );
            }
            const token = signToken(user);
            return { token, user };
        },
        addTicket: async (parent, { infoTicket }, context) => {
            // const newparam = {};
            // for (let [key,val] in Object.entries(infoTicket)) {
            //     if(val != null){
            //         newparam[key] = val;
            //     }
            //     }
            const ticket = await Ticket.create({ infoTicket });
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { tickets: ticket._id },
                }
            );
            return user;
        },
        deleteTicket: async (parent, id, context) => {
            const ticket = await Ticket.deleteOne({ _id: id });
            return ticket;
        },
    },
};

module.exports = resolvers;
