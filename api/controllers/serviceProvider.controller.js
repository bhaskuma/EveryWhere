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
        console.log(gardner);
    } catch (error) {
        console.log(error);
    }
}


module.exports = { signup, signin, gardnerList }