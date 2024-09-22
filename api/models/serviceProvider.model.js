const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    work: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
