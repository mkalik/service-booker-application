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
        addTicket: async (
            parent,
            { ticketTitle, ticketContent, ticketBudget, ticketStatus },
            context
        ) => {
            const ticket = await Ticket.create({
                ticketTitle,
                ticketContent,
                ticketBudget,
                ticketStatus,
            });
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { tickets: ticket._id },
                }
            );
            return ticket;
        },
        deleteTicket: async (parent, info, context) => {
            //this doesnt work yet
            const ticket = await Ticket.deleteOne({ _id: info.id });
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { tickets: { $in: [info.id] } } }
            );
            return ticket;
        },
    },
};

// const newparam = {};
// for (let [key,val] in Object.entries(infoTicket)) {
//     if(val != null){
//         newparam[key] = val;
//     }
//     }
module.exports = resolvers;
