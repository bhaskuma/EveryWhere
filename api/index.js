require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/auth.user.js');
const paymentRouter = require('./routers/payment.user.js')
const subscriptionRouter = require('./routers/subscription.user.js')
const cookieParser = require('cookie-parser');

const app = express();

// Use CORS middleware globally
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter);
app.use("/api", paymentRouter);
app.use("/api", subscriptionRouter);

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




