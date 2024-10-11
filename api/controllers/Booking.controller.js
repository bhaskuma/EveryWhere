const Booking = require('../models/Booking.model')
const serviceprovider = require('../models/serviceProvider.model.js')


// const createBooking = async (req, res) => {
//     console.log(req.body);
//     const { userId, serviceproviderId, Date, Time, Address } = req.body;
//     try {

//         const serviceProvider = await serviceprovider.findById({ serviceproviderId })
//         if (!serviceProvider) {
//             return res.staus(404).json({ msg: "serviceprovider is not found" });
//         }

//         const existingBookings = await Booking.find({
//             serviceProvider_id: serviceproviderId,
//             bookingDate: Date,
//             bookingTime: Time,
//             user_id: userId,
//             Address
//         })

//         if (existingBookings) {
//             return res.status(400).json({ msg: "serviceProvider already book for this time" })
//         }
//         const book = new Booking({
//             serviceProvider_id: serviceproviderId,
//             bookingDate: Date,
//             bookingTime: Time,
//             user_id: userId,
//             Address
//         });
//         await book.save();
//         res.status(201).json({ msg: "succesful book" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: "inital error" });
//     }
// }

const createBooking = async (req, res) => {
    console.log(req.body);
    const { userId, serviceproviderId, Date, Time, Address } = req.body;

    try {
        // Find the service provider by ID
        const serviceProvider = await serviceprovider.findById(serviceproviderId);
        if (!serviceProvider) {
            return res.status(404).json({ msg: "Service provider not found" });
        }

        // Check for existing bookings at the same time for the service provider
        const existingBookings = await Booking.find({
            serviceProvider_id: serviceproviderId,
            bookingDate: Date,
            bookingTime: Time,
            user_id: userId,
            Address
        });

        // If there are any existing bookings, send an error response
        if (existingBookings.length > 0) {
            return res.status(400).json({ msg: "Service provider is already booked for this time" });
        }

        // Create a new booking
        const newBooking = new Booking({
            serviceProvider_id: serviceproviderId,
            bookingDate: Date,
            bookingTime: Time,
            user_id: userId,
            Address
        });

        // Save the booking
        await newBooking.save();

        // Send success response
        res.status(201).json({ msg: "Booking successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


const myBooking = async (req, res) => {
    const { userId } = req.body;
    try {
        const book = await Booking.find({ user_id: userId })

        if (!book) {
            return res.status(400).json({ msg: "not found" })
        }
        console.log(book);
        res.status(201).json(book)

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" });

    }


}


module.exports = { createBooking, myBooking };