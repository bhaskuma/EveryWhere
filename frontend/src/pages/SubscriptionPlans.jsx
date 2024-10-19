import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setSubscription,
  clearSubscription,
} from "../redux/subscription/subscriptionSlice";

const SubscriptionPlans = () => {
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const plans = [
    { duration: 1, price: 1000 },
    { duration: 2, price: 1800 },
    { duration: 3, price: 2500 },
    { duration: 6, price: 4500 },
    { duration: 12, price: 8000 },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePlan = async () => {
    try {
      const res = await axios.post(
        "https://everywhere-ipb6.onrender.com/api/plan",
        {
          userId: currentUser._id,
          plan: selectedPlan.duration,
        }
      );
      console.log(res.data);
      // Dispatch the subscription data to Redux store
      dispatch(setSubscription(res.data.subscription));

      // Navigate to the homepage or success page after subscription is set
      navigate("/");
    } catch (error) {
      console.error("Error updating subscription", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      const {
        data: { key },
      } = await axios.post("https://everywhere-ipb6.onrender.com/api/getkey");
      const {
        data: { order },
      } = await axios.post(
        "https://everywhere-ipb6.onrender.com/api/checkout",
        {
          price: selectedPlan.price,
        }
      );

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "EveryWhere",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          const verificationResponse = await axios.post(
            "https://everywhere-ipb6.onrender.com/api/paymentverfication",
            {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              userId: currentUser._id,
            }
          );

          if (verificationResponse.data.success) {
            // After successful payment and verification, call handlePlan
            await handlePlan();
          } else {
            console.error("Payment verification failed");
            navigate("/plan");
          }
        },
        prefill: {
          name: "bhaskar",
          email: "bhaskae@gmail.com",
          contact: 8958347561,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during payment process", error);
    }
  };

  return (
    <div className="container mx-auto py-10 text-center">
      <h2 className="text-3xl font-bold mb-6">Select Your Subscription Plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.duration}
            className={`border rounded-lg p-6 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedPlan === plan ? "border-green-500" : "border-gray-300"
            }`}
            onClick={() => handlePlanSelect(plan)}
          >
            <h3 className="text-xl font-semibold">
              {plan.duration} {plan.duration > 1 ? "Months" : "Month"}
            </h3>
            <p className="text-gray-600 mt-2">Price: ${plan.price}</p>
          </div>
        ))}
      </div>
      {selectedPlan && (
        <div className="mt-8">
          <h4 className="text-xl font-medium">
            You selected a {selectedPlan.duration}-month plan for $
            {selectedPlan.price}.
          </h4>
          <button
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
