// // SubscriptionPlanSelection.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import handleSubscription from "./components/AddQuestion/index"

// const SubscriptionPlanSelection = () => {
//   const [selectedPlan, setSelectedPlan] = useState('');

//   const handlePlanSelection = async (plan) => {
//   setSelectedPlan(plan);

//   try {
//     // Call the handleSubscription function with the selected plan name
//     await handleSubscription(plan);

//     // Redirect the user back to the question form page
//     window.location.href = '/questions';
//   } catch (error) {
//     console.error(error);
//     // Handle the error
//   }
// };

//   return (
//     <div>
//       <h2>Choose a Subscription Plan</h2>
//       <button onClick={() => handlePlanSelection('silver')}>Silver Plan</button>
//       <button onClick={() => handlePlanSelection('premium')}>Premium Plan</button>
//     </div>
//   );
// };

// export default SubscriptionPlanSelection;


import React, { useState , useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useStripe, useElements,CardElement } from '@stripe/react-stripe-js';
import axios from "axios";

const PaymentElement = ({}) => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentError, setPaymentError] = useState(null);


  useEffect(() => {
    // Fetch the client secret from your server
    axios.post('/create-payment-intent')
      .then(response => {
        setClientSecret(response.data.clientSecret);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  console.log('Stripe:', stripe);
  console.log('Elements:', elements);

  
  const handleSubscription = async (plan) => {
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.log(result.error.message);
        setPaymentError(result.error.message);
      } else {
        // Subscription succeeded
      }
    } catch (error) {
      console.error(error);
      setPaymentError(error.message);
    }
  };
 
  return (
    <div>
      <h1 >Choose a Subscription Plan</h1>
      <CardElement /> 
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
      <button onClick={() => handleSubscription("silver")}>Silver Plan</button>
      <button onClick={() => handleSubscription("premium")}>Premium Plan</button>
    </div>
  );
};



 export default PaymentElement;

//SubscriptionPage
// try {
    //   const response = await axios.post("/subscribe", { plan });
    //   console.log(response.data);

    //   // Redirect to a success page or handle the subscription response as needed
    //   history.push("/subscription-success");
    // } catch (error) {
    //   console.error(error);
    //   // Handle the error
    // }
    // try {
    //   const result = await stripe.confirmPayment({
    //     elements,
    //     confirmParams: {
    //       return_url: 'https://example.com/order/123/complete',
    //     },
    //     clientSecret: clientSecret, // Use the clientSecret passed as a prop
    //   });

    //   if (result.error) {
    //     console.log(result.error.message);
    //   } else {
    //     history.push('/subscription-success');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }

  //    const handleSubscription = async (plan) => {
  //  try {
  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: 'card',
  //       card: elements.getElement(CardElement),
  //     });

  //     if (error) {
  //       // Handle the error
  //       console.log(error.message);
  //       return;
  //     }
  //     }
  //     catch (error) {
  //     console.error(error);
  //     setPaymentError(error.message);
  //   }
    
  
  // };

