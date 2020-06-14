import React from 'react';
// import ReactDOM from 'react-dom';
// import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const [paymentError, setE] = useState(null);
  const [paymentFin, setF] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handlePlaceOrder = async (event,props) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setE(error.message);
      setF(null);
    }
    else {
      setF(paymentMethod);
      const payment ={id:paymentMethod.id,last4:paymentMethod.card.last4}
      props.handlePlaceOrder(payment);
      setE(null);
    }
    //console.log(error, paymentMethod);
  };

  return (
    <form onSubmit={handlePlaceOrder}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        paymentError && <p style={{ color: 'red' }}>{paymentError}</p>
      }
      {
        paymentFin && <p style={{ color: 'green' }}>payment success</p>
      }
    </form>
  );
};
export default CheckoutForm;