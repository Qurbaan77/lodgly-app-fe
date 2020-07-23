import React from 'react';
import PropTypes from 'prop-types';
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
  submitChange, showCancelCheckout, hideBilling, getData,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      toaster('error', event.error.message);
    } else {
      toaster('', '');
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
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
      toaster('error', event.error.message);
    } else {
      toaster('', '');
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
          hideBilling(true);
          getData();
          // window.location.href = '/payment';
        } else {
          toaster('error', 'Transaction Failed');
        }
      } else {
        const err = 'Amount Is Empty';
        toaster('error', err);
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
CheckoutForm.propTypes = {
  total: PropTypes.number,
  currency: PropTypes.string,
  unitsSelected: PropTypes.number,
  subscriptionType: PropTypes.string,
  planType: PropTypes.string,
  toaster: PropTypes.func,
  submitChange: PropTypes.string,
  showCancelCheckout: PropTypes.bool,
  hideBilling: PropTypes.func,
  getData: PropTypes.func,
};
CheckoutForm.defaultProps = {
  total: 0,
  currency: '',
  unitsSelected: 0,
  subscriptionType: '',
  planType: '',
  toaster: () => {},
  submitChange: '',
  showCancelCheckout: false,
  hideBilling: () => {},
  getData: () => {},
};
export default CheckoutForm;
