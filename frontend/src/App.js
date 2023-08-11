import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import StackOverflow from "./components/StackOverflow";
import Header from "./components/Header/Header";
import AddQuestion from "./components/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./feature/userSlice";
import { useState,useEffect } from "react";
import { auth } from "./firebase";

import InjectedCheckoutForm from './Stripe'; // Update the import path

//import {ElementsConsumer, PaymentElement} from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentElement from './PaymentElement';
import AddQuestionWithPayment from "./components/AddQuestion/AddQuestionWithPayment";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      // console.log(authUser);
    });

    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error('Error fetching client secret:', error);
      });
  }, [dispatch]);

   // Fetch the clientSecret from your server
   

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );

  const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{pi_3NdwrZSJcW5T595Y0zps0Gqt_secret_t6NMe0qgdhUrDNnmFpmq0bGB3}}',
  };

  const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};


  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <PrivateRoute exact path="/" component={StackOverflow} />
          <PrivateRoute exact path="/add-question" component={AddQuestion} >
                <Elements stripe={stripePromise} options={options}>
                  <AddQuestionWithPayment /> 
                </Elements>
          </PrivateRoute>
          <PrivateRoute exact path="/question" component={ViewQuestion} />
        </Switch>
      </Router>
      {/* <Elements><InjectedCheckoutForm /></Elements> */}
      {/* <ElementsConsumer><InjectedCheckoutForm /></ElementsConsumer> */}
      {/* <CheckoutForm /> 
              <InjectedCheckoutForm />    */}

      <Elements stripe={stripePromise}>
          <PaymentElement clientSecret={clientSecret} />
      </Elements>
      
    </div>
    
  );


}
// export default CheckoutForm;
export default App;
