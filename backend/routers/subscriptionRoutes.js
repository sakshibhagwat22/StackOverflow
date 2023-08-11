const express = require("express");
const router = express.Router();

// Define the endpoint to render the subscription plan selection page
router.get("/subscription", (req, res) => {
  res.render("subscription"); // Assuming you have a corresponding subscription plan selection template file
});

// Define the endpoint to create a subscription
router.post("/create-subscription", async (req, res) => {
  // Implement your subscription creation logic using Stripe API here
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')('sk_test_51NICxxSJcW5T595YNdUSuqH05DOBWgFYGJRnG3tMaYdSoohVJ9ScE1KXSqkfMfXpdsx4TdXQmJ87QlSScd3GxG1W00HvgF8v3S');

// router.post('/create-subscription', async (req, res) => {
//   const { plan } = req.body;

//   try {
//     console.log('Received create-subscription request with plan:', plan);

//     if (!req.user || !req.user.email) {
//       return res.status(400).json({ error: 'Invalid user object or missing email' });
//     }
//     // Create a customer in Stripe using the customer's email or user ID
//     const customer = await stripe.customers.create({
//       email: req.user.email, // Replace with the appropriate field from your user object
//       // Additional customer information, if required
//       // name: req.user.name,
//       // address: req.user.address,
//     });

//     // Create a subscription for the customer using the selected plan ID
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ plan }],
//     });

//     // Handle the successful subscription creation
//     // You can send a success response or perform additional operations as needed
//     res.status(200).json({ message: 'Subscription created successfully', subscription });

//   } catch (error) {
//     console.error(error);
//     // Handle the error
//     res.status(500).json({ error: 'An error occurred while creating the subscription' });
//   }
// });
// module.exports = router;