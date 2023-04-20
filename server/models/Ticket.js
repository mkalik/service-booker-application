const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketSchema = new Schema({
    ticketTitle: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
        trim: true,
    },
    ticketContent: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200,
    },
    ticketBudget: {
        type: String,
        // required: true,
    },
    ticketStatus: {
        type: Number,
        // required: true,
    },
    ticketCreator: {
        type: String,
        // required: true,
    },

    ticketComments: [
        {
            ticketId: {
                type: String,
            },
            isElevated: {
                type: Boolean,
            },
            username: {
                type: String,
            },
            commentText: {
                type: String,
            },
        },
    ],
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
