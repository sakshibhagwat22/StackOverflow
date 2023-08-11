import axios from 'axios';

// Function to create a subscription
const createSubscription = async () => {
  const paymentMethodId = 'PAYMENT_METHOD_ID'; // Replace with the actual payment method ID
  const customerId = 'CUSTOMER_ID'; // Replace with the actual customer ID
  const priceId = 'price_1NIFvISJcW5T595YYqVGsduz'; // Replace with the actual price ID

  try {
    const response = await axios.post('/create-subscription', {
      paymentMethodId,
      customerId,
      priceId,
    });

    // Handle the response from the server
    console.log(response.data.subscription);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error.response.data.error);
  }
};

// Call the function to create a subscription
createSubscription();
