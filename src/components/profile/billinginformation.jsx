import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import moment from 'moment';
import './profile.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  Form, Select, Row, Col, Collapse, Button, Tooltip, Input,
} from 'antd';
import {
  UserOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';

import BillingHistory from './billinghistory';
import { STRIPE_APP_KEY } from '../../config/keys';
import config from '../../config/config.json';
import { userInstance } from '../../axios/axiosconfig';
import CheckoutForm from './CheckoutForm';
import favicon from '../../assets/images/logo-mobile.png';
// import loader from '../../assets/images/loader.svg';

const stripePromise = loadStripe(STRIPE_APP_KEY);
const { Panel } = Collapse;
const { basicPrice, advancePrice, discount } = config.development.Billing;
const BillingInformation = () => {
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  const [unitPrice, setUnitPrice] = useState(basicPrice);
  const [unitsSelected, setUnitsSelected] = useState();
  const [planType, setPlanType] = useState('basic');
  const [subscriptionType, setSubscriptionType] = useState('month');
  const [exchangeRate, setExchangeRate] = useState([]);
  const [currency, setCurrency] = useState('EUR');
  const [data, addData] = useState();
  const [invoiceList, setInvoiceList] = useState([]);
  const [end, setEnd] = useState('');
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [hideBilling, setHideBilling] = useState(true);
  const [disablePlanType, setDisablePlanType] = useState(false);
  const [disableCurrency, setDisableCurrency] = useState({
    eur: false,
    chf: false,
    pln: false,
    gbp: false,
  });
  const [showCancelCheckout, setShowCancelCheckout] = useState(false);
  const [canDowngrade, setCanDowngrade] = useState();
  const [disableBtn, setDisableBtn] = useState(false);
  const [onFreePlan, setOnFreePlan] = useState(false);
  const [freePlanEnd, setFreePlanEnd] = useState();
  const [coupon, setCoupon] = useState('');
  // const [showCard, setShowCard] = useState(true);
  // const [disablePayNow, setDisablePayNow] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await userInstance.post('/getTotalUnit');
      if (res.data.code === 200 || res.data.code === 404) {
        // const units = res.data.totalUnit || 1;
        // const range = Array(units + 50000 - units + 1)
        //   .fill()
        //   .map((_, idx) => units + idx);
        // setUnitDropDown(range);
        setCanDowngrade(res.data.totalUnit < res.data.units);
      }
      const response = await userInstance.post('/getRate');
      if (response.data.code === 200) {
        const [{ CHF, PLN, GBP }] = response.data.rates;
        const rates = { CHF, PLN, GBP };
        setExchangeRate(rates);
      }
    };
    getData();
  }, []);

  // function for getting current subscription

  const getUser = async () => {
    const response = await userInstance.get('/transactions');
    if (response.data.code === 200 && response.data.onFreePlan) {
      setHideBilling(true);
      setOnFreePlan(true);
      const renewDate = moment(response.data.createdAt).add(1, 'year').format('DD/MM/YYYY');
      setFreePlanEnd(renewDate);
    }
    const {
      code, transactions, endDate, status,
    } = response.data;
    if (code === 200 && transactions != null) {
      const [{ interval }] = transactions;
      if (interval === 'month') {
        const renewDate = moment(endDate);
        setEnd(renewDate._d.toDateString());
      } else {
        const renewDate = moment(endDate);
        setEnd(renewDate._d.toDateString());
      }
      transactions.forEach((element) => {
        addData(element);
        setCurrentCurrency(element.currency);
      });
      if (status === 'canceled') {
        setDisableBtn(true);
      }
    } else {
      addData('');
      setHideBilling(false);
    }
  };

  // function for getting invoices
  const getInvoice = async () => {
    const response = await userInstance.post('/getBillingInvoice');
    if (response.data.code === 200) {
      setInvoiceList(response.data.invoicesList);
    }
  };

  useEffect(() => {
    getUser();
    getInvoice();
  }, []);

  /* ------------------------------- All input handling functions here -------------------------- */

  const handlePlanSelect = (e) => {
    setPlanType(e);
    if (e === 'advance') {
      setUnitPrice(advancePrice);
      if (total) {
        if (subscriptionType === 'month') {
          setTotal(advancePrice * unitsSelected);
        } else {
          const amount = unitsSelected * advancePrice * 12
            - (unitsSelected * advancePrice * 12 * discount) / 100;
          setTotal(amount);
        }
      }
      if (currency === 'CHF' || currency === 'GBP' || currency === 'PLN') {
        if (currency === 'CHF') setUnitPrice(advancePrice * exchangeRate.CHF);
        if (currency === 'PLN') setUnitPrice(advancePrice * exchangeRate.PLN);
        if (currency === 'GBP') setUnitPrice(advancePrice * exchangeRate.GBP);
        setTotal(total * 2);
      }
    } else {
      setUnitPrice(basicPrice);
      if (total) {
        if (subscriptionType === 'month') {
          setTotal(basicPrice * unitsSelected);
        } else {
          const amount = unitsSelected * basicPrice * 12
            - (unitsSelected * basicPrice * 12 * discount) / 100;
          setTotal(amount);
        }
      }
      if (currency === 'CHF' || currency === 'GBP' || currency === 'PLN') {
        if (currency === 'CHF') setUnitPrice(basicPrice * exchangeRate.CHF);
        if (currency === 'PLN') setUnitPrice(basicPrice * exchangeRate.PLN);
        if (currency === 'GBP') setUnitPrice(basicPrice * exchangeRate.GBP);
        if (subscriptionType === 'month' && currency === 'CHF') {
          setTotal(basicPrice * exchangeRate.CHF * unitsSelected);
        }
        if (subscriptionType === 'month' && currency === 'PLN') {
          setTotal(basicPrice * exchangeRate.PLN * unitsSelected);
        }
        if (subscriptionType === 'month' && currency === 'GBP') {
          setTotal(basicPrice * exchangeRate.GBP * unitsSelected);
        }
        if (subscriptionType === 'year' && currency === 'CHF') {
          setTotal(
            basicPrice * exchangeRate.CHF * unitsSelected * 12
              - (basicPrice * exchangeRate.CHF * unitsSelected * 12 * discount)
                / 100,
          );
        }
        if (subscriptionType === 'year' && currency === 'PLN') {
          setTotal(
            basicPrice * exchangeRate.PLN * unitsSelected * 12
              - (basicPrice * exchangeRate.PLN * unitsSelected * 12 * discount)
                / 100,
          );
        }
        if (subscriptionType === 'year' && currency === 'GBP') {
          setTotal(
            basicPrice * exchangeRate.GBP * unitsSelected * 12
              - (basicPrice * exchangeRate.GBP * unitsSelected * 12 * discount)
                / 100,
          );
        }
      }
    }
  };
  const handleUnitChange = (event) => {
    const e = event.target.value;
    setUnitsSelected(e);
    setTotal(e * unitPrice);
    if (currency === 'CHF' || currency === 'GBP' || currency === 'PLN') {
      if (subscriptionType === 'month' && currency === 'CHF') {
        setTotal(basicPrice * exchangeRate.CHF * e);
      }
      if (subscriptionType === 'month' && currency === 'PLN') {
        setTotal(basicPrice * exchangeRate.PLN * e);
      }
      if (subscriptionType === 'month' && currency === 'GBP') {
        setTotal(basicPrice * exchangeRate.GBP * e);
      }
      if (subscriptionType === 'year' && currency === 'CHF') {
        setTotal(
          basicPrice * exchangeRate.CHF * e * 12
            - (basicPrice * exchangeRate.CHF * e * 12 * discount) / 100,
        );
      }
      if (subscriptionType === 'year' && currency === 'PLN') {
        setTotal(
          basicPrice * exchangeRate.PLN * e * 12
            - (basicPrice * exchangeRate.PLN * e * 12 * discount) / 100,
        );
      }
      if (subscriptionType === 'year' && currency === 'GBP') {
        setTotal(
          basicPrice * exchangeRate.GBP * e * 12
            - (basicPrice * exchangeRate.GBP * e * 12 * discount) / 100,
        );
      }
    }
  };

  const handlePlanType = (e) => {
    setSubscriptionType(e);
    if (e === 'month') {
      setTotal(unitsSelected * unitPrice);
    } else {
      const amount = unitsSelected * unitPrice * 12;
      setTotal(amount);
    }
  };

  const handleCurrencyChange = (e) => {
    if (e === 'EUR') {
      setCurrency(e);
      if (planType === 'basic' && subscriptionType === 'month') {
        setUnitPrice(basicPrice);
        setTotal(basicPrice * unitsSelected);
      }
      if (planType === 'basic' && subscriptionType === 'year') {
        setUnitPrice(basicPrice);
        const amount = basicPrice * unitsSelected * 12
          - (basicPrice * unitsSelected * 12 * discount) / 100;
        setTotal(amount);
      }
      if (planType === 'advance' && subscriptionType === 'month') {
        setUnitPrice(advancePrice);
        setTotal(advancePrice * unitsSelected);
      }
      if (planType === 'advance' && subscriptionType === 'year') {
        setUnitPrice(advancePrice);
        const amount = advancePrice * unitsSelected * 12
          - (advancePrice * unitsSelected * 12 * discount) / 100;
        setTotal(amount);
      }
    }
    if (e === 'CHF') {
      setCurrency(e);
      if (planType === 'basic' && subscriptionType === 'month') {
        setUnitPrice(basicPrice * exchangeRate.CHF);
        setTotal(basicPrice * exchangeRate.CHF * unitsSelected);
      }
      if (planType === 'basic' && subscriptionType === 'year') {
        setUnitPrice(basicPrice * exchangeRate.CHF);
        const amount = basicPrice * exchangeRate.CHF * unitsSelected * 12
          - (basicPrice * exchangeRate.CHF * unitsSelected * 12 * discount) / 100;

        setTotal(amount);
      }
      if (planType === 'advance' && subscriptionType === 'month') {
        setUnitPrice(advancePrice * exchangeRate.CHF);
        setTotal(advancePrice * exchangeRate.CHF * unitsSelected);
      }
      if (planType === 'advance' && subscriptionType === 'year') {
        setUnitPrice(advancePrice * exchangeRate.CHF);
        const amount = advancePrice * exchangeRate.CHF * unitsSelected * 12
          - (advancePrice * exchangeRate.CHF * unitsSelected * 12 * discount)
            / 100;
        setTotal(amount);
      }
    }
    if (e === 'PLN') {
      setCurrency(e);
      if (planType === 'basic' && subscriptionType === 'month') {
        setUnitPrice(basicPrice * exchangeRate.PLN);
        setTotal(basicPrice * exchangeRate.PLN * unitsSelected);
      }
      if (planType === 'basic' && subscriptionType === 'year') {
        setUnitPrice(basicPrice * exchangeRate.PLN);
        const amount = basicPrice * exchangeRate.PLN * unitsSelected * 12
          - (basicPrice * exchangeRate.PLN * unitsSelected * 12 * discount) / 100;
        setTotal(amount);
      }
      if (planType === 'advance' && subscriptionType === 'month') {
        setUnitPrice(advancePrice * exchangeRate.PLN);
        setTotal(advancePrice * exchangeRate.PLN * unitsSelected);
      }
      if (planType === 'advance' && subscriptionType === 'year') {
        setUnitPrice(advancePrice * exchangeRate.PLN);
        const amount = advancePrice * exchangeRate.PLN * unitsSelected * 12
          - (advancePrice * exchangeRate.PLN * unitsSelected * 12 * discount)
            / 100;
        setTotal(amount);
      }
    }
    if (e === 'GBP') {
      setCurrency(e);
      if (planType === 'basic' && subscriptionType === 'month') {
        setUnitPrice(basicPrice * exchangeRate.GBP);
        setTotal(basicPrice * exchangeRate.GBP * unitsSelected);
      }
      if (planType === 'basic' && subscriptionType === 'year') {
        setUnitPrice(basicPrice * exchangeRate.GBP);
        const amount = basicPrice * exchangeRate.GBP * unitsSelected * 12
          - (basicPrice * exchangeRate.GBP * unitsSelected * 12 * discount) / 100;
        setTotal(amount);
      }
      if (planType === 'advance' && subscriptionType === 'month') {
        setUnitPrice(advancePrice * exchangeRate.GBP);
        setTotal(advancePrice * exchangeRate.GBP * unitsSelected);
      }
      if (planType === 'advance' && subscriptionType === 'year') {
        setUnitPrice(advancePrice * exchangeRate.GBP);
        const amount = advancePrice * exchangeRate.GBP * unitsSelected * 12
          - (advancePrice * exchangeRate.GBP * unitsSelected * 12 * discount)
            / 100;
        setTotal(amount);
      }
    }
  };

  const handleCouponCode = (e) => {
    setCoupon(e.target.value);
  };

  const checkCoupon = (rule, value) => {
    if (value !== 'YEARLY20') {
      return Promise.reject(new Error('Invalid coupon code'));
    }
    return true;
  };

  // const disablebtn = () => {
  //   if (!unitsSelected && !subscriptionType && !currency && !planType) {
  //     setDisablePayNow(false);
  //     console.log('shgsgs');
  //   }
  // };
  /* ----------------------------- All payment handling functions here -------------------------- */

  const handleChangeSubscription = async () => {
    setHideBilling(false);
    if (data.interval === 'year') setDisablePlanType(true);
    setShowCancelCheckout(true);
    setCurrency(data.currency);
    setUnitsSelected(data.units);
    if (data.currency === 'EUR') {
      setDisableCurrency({
        ...disableCurrency,
        chf: true,
        pln: true,
        gbp: true,
      });
    }
    if (data.currency === 'CHF') {
      setDisableCurrency({
        ...disableCurrency,
        eur: true,
        pln: true,
        gbp: true,
      });
    }
    if (data.currency === 'GBP') {
      setDisableCurrency({
        ...disableCurrency,
        chf: true,
        pln: true,
        eur: true,
      });
    }
    if (data.currency === 'PLN') {
      setDisableCurrency({
        ...disableCurrency,
        chf: true,
        eur: true,
        gbp: true,
      });
    }
  };

  const submitChangesubscription = async () => {
    if (!unitsSelected && !subscriptionType && !currency) {
      toast.error('Please select everything properly', { containerId: 'B' });
    } else {
      const payload = {
        subscriptionId: data.subscriptionId,
        planId: data.planId,
        productId: data.productId,
        amount: total,
        interval: subscriptionType,
        noOfUnits: unitsSelected,
        currency,
        planType,
        coupon,
      };
      const res = await userInstance.post('/changeSubscription', payload);
      if (res.data.code === 200) {
        toast.success('subscription changed successfully', { containerId: 'B' });
        getUser();
        getInvoice();
        setHideBilling(true);
      } else {
        toast.error('server error please try again', { containerId: 'B' });
      }
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await userInstance.post('/cancelSubscription', {
        subscriptionId: data.subscriptionId,
      });
      if (response.data.code === 200) {
        getUser();
        toast.success('subscription cancelled', { containerId: 'B' });
      }
    } catch (error) {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  // const ShowLoader = (
  //   <div className="loader">
  //     <div className="loader-box">
  //       <img src={loader} alt="loader" />
  //     </div>
  //   </div>
  // );

  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
      </Helmet>
      {/* <Suspense fallback={<ShowLoader />}> */}
      <div className="billing-information">
        <div className="page-header">
          <h1>
            <UserOutlined />
            {t('billinginformation.heading1')}
          </h1>
        </div>

        <div className="billing-container">
          <Row gutter={[16, 0]}>
            {
            !onFreePlan
              ? (
                <Col span={16} hidden={hideBilling}>
                  <Collapse defaultActiveKey={['1']} accordion>
                    <Panel header={t('billinginformation.label23')} key="1">
                      <div className="billing-info-form">
                        <Row gutter={[16, 0]}>
                          <Col span={24}>
                            <div className="subscription-plan-list">
                              <div className="invoice-warning" hidden>
                                <WarningOutlined />
                                {t('billinginformation.label2')}
                                {' '}
                                4.07.2020.
                              </div>
                              <div className="invoice-error" hidden>
                                <CloseCircleOutlined hidden />
                                {t('billinginformation.label3')}
                              </div>
                              <Form>
                                <Row gutter={[16, 0]}>
                                  <Col span={6}>
                                    <Form.Item label="Subscription Type">
                                      <Select
                                        defaultValue="basic"
                                        placeholder="basic"
                                        onSelect={handlePlanSelect}
                                      >
                                        <Select.Option value="advance" hidden>
                                          {t('billinginformation.label4')}
                                        </Select.Option>
                                        <Select.Option value="basic">
                                          {t('billinginformation.label5')}
                                        </Select.Option>
                                      </Select>
                                    </Form.Item>
                                  </Col>

                                  <Col span={5}>
                                    <Form.Item
                                      label={t('billinginformation.label7')}
                                      name="pricePerUnit"
                                    >
                                      <div className="amount-field">
                                        <p>{unitPrice}</p>
                                      </div>
                                    </Form.Item>
                                  </Col>
                                  <Col span={1}>
                                    <div className="into">X</div>
                                  </Col>
                                  <Col span={5}>
                                    <Form.Item
                                      label={t('billinginformation.label8')}
                                      rules={[
                                        {
                                          required: true,
                                          message: t('billinginformation.label9'),
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder={t('billinginformation.label8')}
                                        onChange={handleUnitChange}
                                      />
                                      {/* <Select
                                        placeholder={t('billinginformation.label8')}
                                        onSelect={handleUnitSelect}
                                      >
                                        {unitDropDown.map((el) => (
                                          <Select.Option value={el} key={el}>
                                            {el}
                                          </Select.Option>
                                        ))}
                                      </Select> */}
                                    </Form.Item>
                                  </Col>
                                  <Col span={6}>
                                    <Form.Item
                                      label={t('billinginformation.label10')}
                                    >
                                      <Select
                                        defaultValue="Monthly"
                                        placeholder="Monthly"
                                        onSelect={handlePlanType}
                                      >
                                        <Select.Option
                                          value="month"
                                          disabled={disablePlanType}
                                        >
                                          {t('billinginformation.label11')}
                                        </Select.Option>
                                        <Select.Option value="year">
                                          {t('billinginformation.label12')}
                                        </Select.Option>
                                      </Select>
                                    </Form.Item>
                                  </Col>

                                  <Col span={6}>
                                    <Form.Item
                                      name="currency"
                                      label={t('strings.currency')}
                                      rules={[
                                        {
                                          required: true,
                                          message: t('billinginformation.label13'),
                                        },
                                      ]}
                                    >
                                      <Select
                                        placeholder="EUR"
                                        onSelect={handleCurrencyChange}
                                      >
                                        <Select.Option
                                          value="EUR"
                                          disabled={disableCurrency.eur}
                                        >
                                          EUR
                                        </Select.Option>
                                        <Select.Option
                                          value="CHF"
                                          disabled={disableCurrency.chf}
                                          hidden
                                        >
                                          CHF
                                        </Select.Option>
                                        <Select.Option
                                          value="PLN"
                                          disabled={disableCurrency.pln}
                                          hidden
                                        >
                                          PLN
                                        </Select.Option>
                                        <Select.Option
                                          value="GBP"
                                          disabled={disableCurrency.gbp}
                                          hidden
                                        >
                                          GBP
                                        </Select.Option>
                                      </Select>
                                    </Form.Item>
                                  </Col>

                                  <Col span={9} className="total-billing-price">
                                    <Form.Item
                                      label={t('billinginformation.label22')}
                                    >
                                      <h2>
                                        =
                                        {' '}
                                        {Math.round(
                                          (total + Number.EPSILON) * 100,
                                        ) / 100 || 0}
                                        <span>
                                          {' '}
                                          {data
                                            ? data.currency
                                            : currency || ''}
                                          {' '}
                                          {t('billinginformation.label15')}
                                          {' '}
                                          {subscriptionType}
                                        </span>
                                      </h2>
                                      <p>{t('billinginformation.label14')}</p>
                                    </Form.Item>
                                  </Col>
                                  <Form.Item
                                    name="coupon"
                                    rules={[{ validator: checkCoupon }]}
                                    style={{ maxWidth: '50%', marginTop: '20px' }}
                                  >
                                    <Input
                                      placeholder="Enter coupon code here"
                                      onChange={handleCouponCode}
                                    />
                                  </Form.Item>
                                </Row>
                                <Row gutter={[16, 0]}>
                                  <Col span={24}>
                                    <div>
                                      <Elements stripe={stripePromise}>
                                        {showCancelCheckout ? (
                                          <CheckoutForm
                                            total={(total + Number.EPSILON) * 100}
                                            currency={currency}
                                            unitsSelected={unitsSelected}
                                            subscriptionType={subscriptionType}
                                            planType={planType}
                                            submitChange={submitChangesubscription}
                                            showCancelCheckout={showCancelCheckout}
                                            coupon={coupon}
                                          />
                                        ) : (
                                          <CheckoutForm
                                            total={(total + Number.EPSILON) * 100}
                                            currency={currency}
                                            unitsSelected={unitsSelected}
                                            subscriptionType={subscriptionType}
                                            planType={planType}
                                            hideBilling={setHideBilling}
                                            getData={getUser}
                                            getInvoice={getInvoice}
                                            coupon={coupon}
                                          />
                                        )}
                                      </Elements>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  </Collapse>
                </Col>
              )
              : ''
          }
            {data ? (
              <Col span={16}>
                <Collapse defaultActiveKey={['1']} accordion>
                  <Panel
                    header={`${data.interval}ly Subscription Plan`}
                    key="1"
                  >
                    <div className="billing-info-form">
                      <Row gutter={[16, 0]}>
                        <Col span={14}>
                          <div className="subscription-plan-list">
                            <ul>
                              <li>
                                {t('billinginformation.label16')}
                                {' '}
                                <span>
                                  {data.amount}
                                  {' '}
                                  {data.currency}
                                  /
                                  {' '}
                                  {data.interval}
                                </span>
                              </li>
                              {/* <li>
                                  Bonus Credit
                                  {' '}
                                  <span>305 EUR</span>
                                </li> */}
                              <li>
                                {t('billinginformation.label10')}
                                {' '}
                                <span>{data.planType}</span>
                              </li>
                              <li>
                                {t('billinginformation.label17')}
                                {' '}
                                <span>
                                  {data.planType === 'basic'
                                    ? ''
                                    : '23% off Pay-As-You-Go'}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <Button
                            onClick={handleChangeSubscription}
                            disabled={disableBtn}
                          >
                            {t('billinginformation.label18')}
                          </Button>
                          {canDowngrade ? (
                            <Button
                              style={{ margin: '50px 30px 20px 10px' }}
                              onClick={handleChangeSubscription}
                              disabled={disableBtn}
                            >
                              Downgrade
                            </Button>
                          ) : (
                            <Tooltip
                              title="You are utilising all your subscribed units,to downgrade you have to delete some units"
                              color="gold"
                            >
                              <Button
                                style={{ margin: '50px 30px 20px 10px' }}
                                disabled
                              >
                                downgrade
                              </Button>
                            </Tooltip>
                          )}
                        </Col>

                        <Col span={10}>
                          <div className="subscription-plan-list">
                            <p>
                              {t('billinginformation.label19')}
                              {' '}
                              <span>
                                {data.interval}
                                {t('billinginformation.label20')}
                              </span>
                            </p>
                            <p>
                              {t('billinginformation.label21')}
                              {' '}
                              {end}
                            </p>
                          </div>
                          <Button
                            onClick={handleCancelSubscription}
                            disabled={disableBtn}
                          >
                            {t('strings.cancel')}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </Collapse>
              </Col>
            ) : onFreePlan ? (
              <Col span={16}>
                <Collapse defaultActiveKey={['1']} accordion>
                  <Panel
                    header="Free yearly Subscription Plan"
                    key="1"
                  >
                    <div className="billing-info-form">
                      <Row gutter={[16, 0]}>
                        <Col span={14}>
                          <div className="subscription-plan-list">
                            <li>
                              <span>Advance Plan</span>
                            </li>
                          </div>
                        </Col>

                        <Col span={10}>
                          <div className="subscription-plan-list">
                            <p>
                              {t('billinginformation.label24')}
                              {' '}
                              <span>
                                Year
                                {t('billinginformation.label20')}
                              </span>
                            </p>
                            <p>
                              {t('billinginformation.label21')}
                              {' '}
                              {freePlanEnd}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </Collapse>
              </Col>
            ) : ''}
          </Row>
        </div>
      </div>
      {data ? (
        <BillingHistory
          invoiceList={invoiceList}
          data={data}
          currency={currentCurrency}
        />
      ) : (
        ''
      )}

      {/* </Suspense> */}
    </Wrapper>
  );
};

export default BillingInformation;
