const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    phone: {
        type: Number,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    servicesOffered: {
        type: String,
        required: true

    },
    bookings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'

    }
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
