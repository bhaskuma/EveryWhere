const User = require("../models/user.model.js");
const Subscription = require("../models/subscription.model.js");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const { sendMail } = require('../helpers/sendMail.js')

const signup = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields (name, email, phone, and password) are required." });
        }
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(409).json({ message: "A user with this email or phone number already exists." });
        }
        var salt = bcrypt.genSaltSync(10);
        const newUser = new User({ name, email, phone, password: bcrypt.hashSync(password, salt) });
        await newUser.save();
        sendMail(email, "Welcome to our app", `Dear ${name} welcome to our application we will provide best serviecs`);
        res.status(201).json({ message: "User successfully created", data: newUser });

    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};



// const signin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required." });
//         }


//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found. Please signup first." });
//         }

//         if (!bcrypt.compareSync(password, user.password)) {
//             return res.status(401).json({ message: "Incorrect password." });
//         }
//         const token = jwt.sign({ id: user.id }, process.env.key, { expiresIn: '1h' })


//         const { password: pass, ...rest } = user._doc

//         //subscription check before login


//         const subscription = await Subscription.findOne({ userId: user._id });

//         const isSubscribed = false;
//         if (subscription) {
//             const currentDate = new Date();
//             if (currentDate <= subscription.endDate) {
//                 isSubscribed = true;
//             } else {
//                 subscription.status = 'expired';
//                 await subscription.save();
//             }
//         }


//         res.cookie('access_token', token, { httpOnly: true }).status(200).json({
//             rest, subscription: {
//                 status: subscription.status,
//                 plan: subscription.plan,
//                 endDate: subscription.endDate,
//             }
//         });

//     } catch (error) {
//         res.status(500).json({ message: "An error occurred during signin", error });
//     }
// };
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please signup first." });
        }

        // Verify password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id }, process.env.key, { expiresIn: '1h' });

        // Remove password from user object before sending response
        const { password: pass, ...userWithoutPassword } = user._doc;

        // Check if user has a subscription
        let isSubscribed = false;
        let subscriptionInfo = null;

        const subscription = await Subscription.findOne({ userId: user._id });
        if (subscription) {
            const currentDate = new Date();
            if (currentDate <= subscription.endDate) {
                isSubscribed = true;
            } else {
                subscription.status = 'expired';
                await subscription.save();
            }
            // Prepare subscription details
            subscriptionInfo = {
                status: subscription.status,
                plan: subscription.plan,
                endDate: subscription.endDate,
            };
        }

        // Set token in cookie and return response
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({
                user: userWithoutPassword,
                subscription: subscriptionInfo || { status: 'inactive', plan: null, endDate: null },
            });

    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ message: "An error occurred during signin", error });
    }
};




module.exports = { signup, signin };
