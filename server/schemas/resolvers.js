const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Ticket, User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate(
                    'tickets'
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        user: async (parent, { profileId }) => {
            return User.findOne({ _id: profileId }).populate('tickets');
        },
        tickets: async (parent, {ticketCreator, privilege}) => {
            console.log(ticketCreator, privilege)
            if (privilege === 'admin') {
                return Ticket.find({})
            }
            else {
                return Ticket.find({ticketCreator: ticketCreator})
            }
        },
        getSingleTicket: async (parent, { ticketId }) => {
            return Ticket.findOne({ _id: ticketId });
            // return { ticket };
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password, privilege }) => {
            const user = await User.create({ username, email, password, privilege });
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
            {
                ticketTitle,
                ticketContent,
                ticketBudget,
                ticketStatus,
                ticketCreator,
            },
            context
        ) => {
            const ticket = await Ticket.create({
                ticketTitle,
                ticketContent,
                ticketBudget,
                ticketStatus,
                ticketCreator,
            });
            const user = await User.findOneAndUpdate(
                //this should be used
                { _id: context.user._id },
                // for testing purposes only!
                // { username: ticketCreator },
                {
                    $addToSet: { tickets: ticket._id },
                }
            );
            return ticket;
        },
        addComment: async (
            parent,
            { ticketId, commentText, username },
            context
        ) => {
            const ticket = await Ticket.findOneAndUpdate(
                { _id: ticketId },
                {
                    $addToSet: {
                        ticketComments: { ticketId, username, commentText },
                    },
                }
            );
            return ticket;
        },
    },
};

//deleteTicket: async (parent, info, context) => {
//    //this doesnt work yet
//    const ticket = await Ticket.deleteOne({ _id: info.id });
//    const user = await User.findOneAndUpdate(
//        { _id: context.user._id },
//        { $pull: { tickets: { $in: [info.id] } } }
//    );
//    return ticket;
//},
// const newparam = {};
// for (let [key,val] in Object.entries(infoTicket)) {
//     if(val != null){
//         newparam[key] = val;
//     }
//     }
module.exports = resolvers;
