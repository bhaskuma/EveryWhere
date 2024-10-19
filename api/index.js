require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/auth.user.js');
const paymentRouter = require('./routers/payment.user.js')
const subscriptionRouter = require('./routers/subscription.user.js')
const serviceprovider = require('./routers/serviceprovider.user.js')
const BookingRouter = require('./routers/booking.user.js')
const cookieParser = require('cookie-parser');
const adminProvider = require('./routers/admin.user.js')

const app = express();


const allowedOrigins = ['https://everywhere-frontend.onrender.com'];

app.use(cors({
    origin: function (origin, callback) {

        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
}));
// app.use(
//     cors({
//         origin: "http://localhost:3000", // Allow your frontend URL
//         credentials: true, // If you're using cookies/sessions
//     })
// );

app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter);
app.use("/api", paymentRouter);
app.use("/api", subscriptionRouter);
app.use("/api/service-provider", serviceprovider);
app.use("/api/", BookingRouter);
app.use("/api", adminProvider)

// Start server
app.listen(process.env.PORT || 8000, () => {
    console.log(`App is running on port ${process.env.PORT || 8000}`);
});

// Connect to MongoDB
mongoose.connect(process.env.url || 'your_mongodb_url').then(() => {
    console.log("Database successfully connected");
}).catch((err) => {
    console.log({ msg: "Error in database connectivity", err });
});




