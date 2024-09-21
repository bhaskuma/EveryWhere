const User = require("../models/user.model.js");
const Subscription = require('../models/subscription.model.js')

const createSubscription = async (req, res) => {
    console.log(req.body)
    const { userId, plan } = req.body;
    try {
        const subscription = new Subscription({
            userId: userId,
            plan: plan,
            status: 'active',
            startDate: new Date().toLocaleDateString(),
            endDate: calculateEndDate(plan)


        })
        await subscription.save();
        if (subscription) {
            res.status(200).json({ subscription });
        }
    } catch (error) {
        console.log(error)
    }



}

function calculateEndDate(plan) {
    const today = new Date();
    const laterDate = new Date(today);

    laterDate.setMonth(today.getMonth() + plan);

    if (laterDate.getDate() < today.getDate()) {
        laterDate.setDate(0);
    }

    return laterDate;
}



module.exports = { createSubscription };