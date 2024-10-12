const Booking = require('../models/Booking.model')
const serviceprovider = require('../models/serviceProvider.model.js')




const createBooking = async (req, res) => {
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
    console.log(req.body);

    try {
        // Find bookings for the user
        const bookings = await Booking.find({ user_id: userId });

        // If no bookings are found
        if (!bookings || bookings.length === 0) {
            return res.status(400).json({ msg: "No bookings found" });
        }

        // Array to hold bookings along with service provider information
        const bookingDetails = [];

        // Loop through each booking to fetch the related service provider information
        for (const booking of bookings) {
            const serviceProvider = await serviceprovider.findById(booking.serviceProvider_id);
            console.log(serviceProvider);
            // Push the booking along with the service provider name to the result array
            bookingDetails.push({
                booking,
                serviceProviderName: serviceProvider?.name || "Unknown Provider",
                serviceType: serviceProvider?.servicesOffered || "Unknown Service",
            });
        }
        console.log(bookingDetails)
        // Send back the combined booking and service provider information
        res.status(200).json({ bookings: bookingDetails });

    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const deleteBooking = async (req, res) => {
    const { id } = req.body;

    try {
        const data = await Booking.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking successfully deleted", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const acceptBooking = async (req, res) => {
    const { id } = req.body;

    try {
        const data = await Booking.findByIdAndUpdate(id, { status: 'accept' }, { new: true });

        if (!data) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking successfully accepted", data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { createBooking, myBooking, deleteBooking, acceptBooking };