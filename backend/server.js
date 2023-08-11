

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require('express');
 const stripe = require('stripe')('sk_test_51NICxxSJcW5T595YNdUSuqH05DOBWgFYGJRnG3tMaYdSoohVJ9ScE1KXSqkfMfXpdsx4TdXQmJ87QlSScd3GxG1W00HvgF8v3S');
//const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');
// const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./routers");
const bodyParser = require("body-parser");
// const subscriptionRoutes = require("./routers/subscriptionRoutes");

// Other server configurations and middleware

// Use the subscription routes


const PORT = process.env.PORT || 80;

const db = require("./db");
db.connect();

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});



// app.use(express.json());

// Define a route to create a subscription
// Define a route to create a subscription
// app.post('/create-subscription', async (req, res) => {
//   const { email, plan } = req.body;

//   try {
//     // Create a customer
//     const customer = await stripe.customers.create({
//       email: email,
//       payment_method: 'pm_card_visa', // Replace with the actual payment method ID
//       invoice_settings: {
//         default_payment_method: 'pm_card_visa', // Replace with the actual payment method ID
//       },
//     });

//     // Determine the price ID based on the selected plan
//     let priceId;
//     if (plan === 'silver') {
//       priceId = 'price_1NIFq4SJcW5T595YCk9t3KQc'; // Replace with the actual price ID for the silver plan
//     } else if (plan === 'premium') {
//       priceId = 'price_1NIFvISJcW5T595YYqVGsduz'; // Replace with the actual price ID for the premium plan
//     } else {
//       throw new Error('Invalid plan selected');
//     }

//     // Create a subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ price: priceId }],
//       expand: ['latest_invoice.payment_intent'],
//     });

//     // Return the subscription details to the client
//     res.json({ subscription });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while creating the subscription.' });
//   }
// });



app.use(cors());

// app.use('/api', subscriptionRoutes);
app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
  res.cookie('cookieName', 'cookieValue', { sameSite: 'strict' });
});

// app.post('/create-payment-intent', async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000,  // Amount in cents
//       currency: 'usd',
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Example Node.js Express route that creates a PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
    });

    console.log('Payment Intent:', paymentIntent); // Add this line to log the response

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating Payment Intent:', error);
    res.status(500).send({ error: 'An error occurred' });
  }
});


app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Welcome to stackoverflow clone");
  }
});

app.listen(PORT, () => {
  console.log(`Stack Overflow Clone API is running on PORT No- ${PORT}`);
});




