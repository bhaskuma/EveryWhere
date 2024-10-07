const { model } = require('mongoose')
const serviceprovider = require('../models/serviceProvider.model.js')
const bcrypt = require('bcryptjs')

const signup = async (req, res) => {

    const { name, email, password, phone, experience, servicesOffered } = req.body;
    try {

        let serviceProvider = await serviceprovider.findOne({ email });
        if (serviceProvider) {
            return res.status(400).json({ msg: "Service Provider already exists" });
        }
        serviceProvider = new serviceprovider({
            name, email, password: bcrypt.hashSync(password, 10), phone, experience, servicesOffered
        })
        await serviceProvider.save();

        res.status(201).json({ message: 'successful' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');

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
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        res.status(201).json({ msg: "succesful login" });

    } catch (error) {
        console.log(error);

        res.status(500).send('Server Error');
    }

}

//gardner list


const gardnerList = async (req, res) => {
    try {
        const gardner = await serviceprovider.find({ servicesOffered: { $in: ['gardening'] } })
        console.log(gardner)
        const gardnerData = gardner.map(({ name, phone, _id, experience, servicesOffered }) => ({ name, phone, id: _id, experience, profession: servicesOffered }));


        res.status(201).json({ gardnerData })
    } catch (error) {
        console.log(error);
    }
}


const clearnerList = async (req, res) => {
    try {
        const clearner = await serviceprovider.find({ servicesOffered: { $in: ['clearning'] } })
        console.log(clearner)
        const clearnerData = clearner.map(({ name, phone }) => ({ name, phone }));


        res.status(201).json({ clearnerData })
    } catch (error) {
        console.log(error);
    }
}

const electricianList = async (req, res) => {
    try {

        const electrician = await serviceprovider.find({ servicesOffered: { $in: ['electrician'] } });
        const electricianData = electrician.map(({ name, phone }) => ({ name, phone }))
        res.status(201).json({ electricianData })

    } catch (error) {
        console.log(error)
    }
}

module.exports = { signup, signin, gardnerList, electricianList, clearnerList }