// AddQuestionWithPayment.js

import React from 'react';
import AddQuestion from './index';
import CheckoutForm from './../../PaymentElement'; // Replace with your actual PaymentElement component

const AddQuestionWithPayment = () => {
  return (
    <div>
      <AddQuestion />
      <CheckoutForm />
    </div>
  );
};

export default AddQuestionWithPayment;
