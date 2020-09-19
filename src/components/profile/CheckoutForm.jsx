import React from 'react';
import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Form, Button } from 'antd';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { userInstance } from '../../axios/axiosconfig';
// import loader from '../../assets/images/loader.svg';
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
  total, currency, unitsSelected, subscriptionType, planType,
  submitChange, showCancelCheckout, hideBilling, getData, getInvoice, coupon,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  // const [hideLoader, setHideLoader] = useState(true);
  // const [disableBtn, setDisableBtn] = useState(true);

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      toast.error(event.error.message, { containerId: 'B' });
    }
  };

  // Handle form submission.
  const handleSubmit = async () => {
    // event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (!result.error) {
      // Send the token to your server.
      if (total !== 0) {
        // setHideLoader(false);
        let token;
        if (process.env.REACT_APP_ENV === 'development' || process.env.REACT_APP_ENV === 'staging') {
          token = 'tok_visa';
        } else {
          token = result.token.id;
        }
        const payload = {
          stripeToken: token,
          amount: total / 100,
          interval: subscriptionType,
          noOfUnits: unitsSelected,
          currency,
          planType,
          coupon,
        };
        const response = await userInstance.post('/charge', payload);
        const { code } = response.data;
        if (code === 400) {
          // setHideLoader(true);
          toast.error('Please provide correct information', { containerId: 'B' });
        }
        if (code === 200) {
          //  setHideLoader(true);
          toast.success(t('checkoutform.tooltip1'), { containerId: 'B' });
          hideBilling(true);
          getData();
          getInvoice();
        } else {
        //  setHideLoader(true);
          toast.error(t('checkoutform.tooltip2'), { containerId: 'B' });
        }
      } else {
        // setHideLoader(true);
        const err = 'Amount Is Empty';
        toast.error(err, { containerId: 'B' });
      }
    } else {
      // console.log(event);
      // Inform the user if there was an error.
      // toast.error(event.error.message, { containerId: 'B' });
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      {/* <div className="loader" hidden={hideLoader}>
        <div className="loader-box">
          <img src={loader} alt="loader" />
        </div>
      </div> */}
      {
      showCancelCheckout
        ? (
          <Form onFinish={(e) => submitChange(e)}>
            {' '}
            <Form.Item label={t('checkoutform.heading1')}>
              <CardElement
                className="stripe-element"
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleChange}
              />
            </Form.Item>
            <Button type="primary" disabled={!stripe} htmlType="submit">
              {t('checkoutform.label1')}
            </Button>
          </Form>
        )
        : (
          <Form onFinish={(e) => handleSubmit(e)}>
            {' '}
            <Form.Item label={t('checkoutform.heading1')}>
              <CardElement
                className="stripe-element"
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleChange}
              />
            </Form.Item>
            <Button type="primary" disabled={!unitsSelected} htmlType="submit">
              {t('checkoutform.label1')}
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
  submitChange: PropTypes.string,
  showCancelCheckout: PropTypes.bool,
  hideBilling: PropTypes.func,
  getData: PropTypes.func,
  getInvoice: PropTypes.func,
  coupon: PropTypes.string,
};
CheckoutForm.defaultProps = {
  total: 0,
  currency: '',
  unitsSelected: 0,
  subscriptionType: '',
  planType: '',
  submitChange: '',
  coupon: '',
  showCancelCheckout: false,
  hideBilling: () => {},
  getData: () => {},
  getInvoice: () => {},
};
export default CheckoutForm;
