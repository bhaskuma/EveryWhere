const Booking = require('../models/Booking.model')
const serviceprovider = require('../models/serviceProvider.model.js')


const createBooking = async (req, res) => {
    const { user_id, serviceProvider_id, serviceType, bookingDate, bookingTime } = req.body;
    try {

        const serviceProvider = await serviceprovider.findById({ serviceProvider_id })
        if (!serviceProvider) {
            return res.staus(404).json({ msg: "serviceprovider is not found" });
        }

        const existingBookings = await Booking.find({
            serviceProvider_id: serviceProvider_id,
            bookingDate: bookingDate,
            bookingTime: bookingTime

        })

        if (existingBookings) {
            return res.status(400).json({ msg: "serviceProvider already book for this time" })
        }
        const book = new Booking({ user: user_id, serviceProvider: serviceProvider_id, serviceType, bookingDate, bookingTime });
        await book.save();
        res.status(201).json({ msg: "succesful book" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "inital error" });
    }
}


module.exports = { createBooking };