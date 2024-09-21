const mongoose = require('mongoose')

paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true

    },
    orderId: {
        type: String,
        required: true

    },
    paymentId: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('payment', paymentSchema);