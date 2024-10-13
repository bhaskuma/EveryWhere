const Booking = require('../models/Booking.model.js');
const User = require('../models/user.model.js');
const Subscription = require('../models/subscription.model.js');
const serviceprovider = require('../models/serviceProvider.model.js')

const allBooking = async (req, res) => {
    try {
        const bookings = await Booking.find({});
        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        res.status(200).json({ bookings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const allUsers = async (req, res) => {
    try {
        const allusers = await User.find({});
        if (allusers.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ allusers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const allSubscription = async (req, res) => {
    try {
        // Use populate to fetch user data along with subscriptions
        const allSubscriptions = await Subscription.find({})
            .populate('userId', 'name email') // Assuming 'userId' is the reference field in Subscription schema
            .exec();

        if (allSubscriptions.length === 0) {
            return res.status(404).json({ message: "No subscriptions found" });
        }

        // Transform the data to return only necessary fields
        const subscriptionsWithUsers = allSubscriptions.map((subscription) => ({
            subscriptionId: subscription._id,
            status: subscription.status,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            user: {
                name: subscription.userId.name || "Unknown",
                email: subscription.userId.email || "Unknown",
            },
        }));

        res.status(200).json({ subscriptionsWithUsers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const allProvider = async (req, res) => {
    try {
        const allProviders = await serviceprovider.find({});
        if (allProviders.length === 0) {
            return res.status(404).json({ message: "No providers found" });
        }
        res.status(200).json({ allProviders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { allBooking, allUsers, allProvider, allSubscription };
