const Razorpay = require('razorpay');
const crypto = require('crypto');
const paymentSchema = require('../models/payment.model')

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const checkout = async (req, res) => {
    const { price } = req.body;
    try {

        const options = {
            amount: Number(price * 100),
            currency: "INR"
        };

        console.log("bhaskar")
        const order = await instance.orders.create(options);
        res.status(200).json({ order });
    } catch (error) {

        console.error("Error in creating order:", error);


        res.status(500).json({ error: "Failed to create order" });
    }
}

const getkey = (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
}

const paymentVerification = async (req, res) => {
    const { paymentId, orderId, signature, userId } = req.body;

    try {

        if (!paymentId || !orderId || !signature) {
            return res.status(400).json({ error: "Missing required payment details" });
        }


        const body = orderId + "|" + paymentId;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');
        console.log("Received Signature:", signature);
        console.log("Expected Signature:", expectedSignature);

        if (signature === expectedSignature) {
            const data = new paymentSchema({
                userId: userId,
                orderId: orderId,
                paymentId: paymentId
            });
            await data.save();



            return res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error in payment verification:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};




module.exports = { checkout, paymentVerification, getkey };