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
        type: Boolean,
        // required: true,
    },
    ticketCreator: {
        type: String,
        // required: true,
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
