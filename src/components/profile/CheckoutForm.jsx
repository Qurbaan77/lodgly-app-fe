import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Form, Button } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};
const CheckoutForm = ({
  total, currency, unitsSelected, subscriptionType, planType, toaster,
  submitChange, showCancelCheckout,
}) => {
  console.log();
  const [error, setError] = useState();
  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    console.log(event);
    // event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      if (total !== 0) {
        const payload = {
          stripeToken: result.token.id,
          amount: total / 100,
          interval: subscriptionType,
          noOfUnits: unitsSelected,
          currency,
          planType,
        };
        const response = await userInstance.post('/charge', payload);
        const { code } = response.data;
        if (code === 200) {
          toaster('success', 'Your Transaction was successful');
          // window.location.href = '/payment';
        } else {
          toaster('error', 'Transaction Failed');
        }
      } else {
        const err = 'Amount Is Empty';
        setError(err);
      }
    }
  };

  return (
    <div>
      {
      showCancelCheckout
        ? (
          <Form onFinish={(e) => submitChange(e)}>
            {' '}
            <Form.Item label="Enter Your Card Details">
              <CardElement
                className="stripe-element"
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleChange}
              />
            </Form.Item>
            <Button type="primary" disabled={!stripe} htmlType="submit">
              submit Details
            </Button>
          </Form>
        )
        : (
          <Form onFinish={(e) => handleSubmit(e)}>
            {' '}
            <Form.Item label="Enter Your Card Details">
              <CardElement
                className="stripe-element"
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleChange}
              />
            </Form.Item>
            <Button type="primary" disabled={!stripe} htmlType="submit">
              submit Details
            </Button>
          </Form>
        )
    }

    </div>
  );
};

export default CheckoutForm;
