const { Schema, model } = require('mongoose');

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
        type: Number,
        required: true,
    },
    ticketStatus: {
        type: Boolean,
        required: true,
    },
    ticketCreator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;
