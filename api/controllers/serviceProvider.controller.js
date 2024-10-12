
const serviceprovider = require('../models/serviceProvider.model.js')
const bcrypt = require('bcryptjs');
const Booking = require('../models/Booking.model.js')

const signup = async (req, res) => {

    const { name, email, password, phone, experience, servicesOffered } = req.body;
    try {

        let serviceProvider = await serviceprovider.findOne({ email });
        if (serviceProvider) {
            return res.status(400).json({ message: "Service Provider already exists" });
        }
        serviceProvider = new serviceprovider({
            name, email, password: bcrypt.hashSync(password, 10), phone, experience, servicesOffered
        })
        await serviceProvider.save();

        res.status(201).json({ message: 'successful' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Server Error' });

    }

}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await serviceprovider.findOne({ email });
        if (!data) {
            return res.status(400).json({ msg: "Not found" });
        }
        const isMatch = bcrypt.compareSync(password, data.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.status(201).json({ message: "succesful login", data });

    } catch (error) {
        console.log(error);

        res.status(500).send('Server Error');
    }

}

//gardner list


const gardnerList = async (req, res) => {
    try {
        const gardner = await serviceprovider.find({ servicesOffered: { $in: ['gardening'] } })

        const gardnerData = gardner.map(({ name, phone, id, experience, servicesOffered }) => ({ name, phone, _id: id, experience, profession: servicesOffered }));


        res.status(201).json({ gardnerData })
    } catch (error) {
        console.log(error);
    }
}


const cookList = async (req, res) => {
    try {
        const cook = await serviceprovider.find({ servicesOffered: { $in: ['cooking'] } })

        const cookData = cook.map(({ id, name, phone }) => ({ _id: id, name, phone }));


        res.status(201).json({ cookData })
    } catch (error) {
        console.log(error);
    }
}

const electricianList = async (req, res) => {
    try {

        const electrician = await serviceprovider.find({ servicesOffered: { $in: ['electrician'] } });
        const electricianData = electrician.map(({ name, phone, id }) => ({ name, phone, _id: id }))
        res.status(201).json({ electricianData })

    } catch (error) {
        console.log(error)
    }
}

const serviceproviderBookingList = async (req, res) => {
    const { serviceId } = req.body;
    console.log(serviceId)
    try {
        const data = await Booking.find({ serviceProvider_id: serviceId });

        if (!data) {
            return res.status(400).json({})
        }
        res.status(201).json({ data });
    } catch (error) {
        req.status(500).json("internal error")
        console.log(error)
    }
}

module.exports = { signup, signin, gardnerList, electricianList, cookList, serviceproviderBookingList }