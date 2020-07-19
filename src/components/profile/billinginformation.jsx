import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './profile.css';
import {
  Form, Select, Row, Col, Collapse,
} from 'antd';
import {
  UserOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';

import BillingHistory from './billinghistory';
import { basicPrice, advancePrice, discount } from '../../config/keys';
import { userInstance, stripeKey } from '../../axios/axiosconfig';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(stripeKey);

const { Panel } = Collapse;

const BillingInformation = () => {
  const [form] = Form.useForm();
  const [unitDropDown, setUnitDropDown] = useState([]);
  const [total, setTotal] = useState(0);
  const [unitPrice, setUnitPrice] = useState(basicPrice);
  const [unitsSelected, setUnitsSelected] = useState();
  const [planType, setPlanType] = useState('basic');
  const [subscriptionType, setSubscriptionType] = useState('month');
  const [exchangeRate, setExchangeRate] = useState([]);
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await userInstance.post('/getTotalUnit');
      if (res.data.code === 200) {
        const units = res.data.data;
        const range = Array(units + 50 - units + 1)
          .fill()
          .map((_, idx) => units + idx);
        setUnitDropDown(range);
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
  const handleUnitSelect = (e) => {
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
      const amount = unitsSelected * unitPrice * 12
        - (unitsSelected * unitPrice * 12 * discount) / 100;
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

  /* ------------------------------- All payment handling functions here -------------------------- */

  return (
    <Wrapper>
      <div className="billing-information">
        <div className="page-header">
          <h1>
            <UserOutlined />
            {' '}
            Billing Information
          </h1>
        </div>

        <div className="billing-container">
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Collapse defaultActiveKey={['1']} accordion>
                <Panel header="Active Subscription" key="1">
                  <div className="billing-info-form">
                    <Row gutter={[16, 0]}>
                      <Col span={24}>
                        <div className="subscription-plan-list">
                          <div className="invoice-warning" hidden>
                            <WarningOutlined />
                            {' '}
                            You have trial period active
                            untill 4.07.2020.
                          </div>
                          <div className="invoice-error" hidden>
                            <CloseCircleOutlined hidden />
                            {' '}
                            Payment method not
                            set. Please update your payment method.
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
                                    <Select.Option value="advance">
                                      Advance
                                    </Select.Option>
                                    <Select.Option value="basic">
                                      Basic
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>

                              <Col span={5}>
                                <Form.Item
                                  label="price Per Unit"
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
                                <Form.Item label="Units">
                                  <Select
                                    placeholder="units"
                                    onSelect={handleUnitSelect}
                                  >
                                    {unitDropDown.map((el) => (
                                      <Select.Option value={el}>
                                        {el}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={6}>
                                <Form.Item label="Plan Type">
                                  <Select
                                    defaultValue="Monthly"
                                    placeholder="Monthly"
                                    onSelect={handlePlanType}
                                  >
                                    <Select.Option value="month">
                                      Monthly
                                    </Select.Option>
                                    <Select.Option value="year">
                                      Yearly
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>

                              <Col span={6}>
                                <Form.Item label="currency">
                                  <Select
                                    defaultValue="EUR"
                                    placeholder="Eur"
                                    onSelect={handleCurrencyChange}
                                  >
                                    <Select.Option value="EUR">
                                      EUR
                                    </Select.Option>
                                    <Select.Option value="CHF">
                                      CHF
                                    </Select.Option>
                                    <Select.Option value="PLN">
                                      PLN
                                    </Select.Option>
                                    <Select.Option value="GBP">
                                      GBP
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>

                              <Col span={9} className="total-billing-price">
                                <Form.Item label="Total Price">
                                  <h2>
                                    =
                                    {' '}
                                    {Math.round(
                                      (total + Number.EPSILON) * 100,
                                    ) / 100 || 0}
                                    <span>
                                      {' '}
                                      per
                                      {subscriptionType}
                                    </span>
                                  </h2>
                                  <p>20% discount if you select Yearly plan</p>
                                </Form.Item>
                              </Col>
                            </Row>
                            <Col span={6}>
                              <div>
                                <Elements stripe={stripePromise}>
                                  <CheckoutForm
                                    total={total}
                                    currency={currency}
                                    unitsSelected={unitsSelected}
                                    subscriptionType={subscriptionType}
                                    planType={planType}

                                  />
                                </Elements>
                              </div>
                            </Col>
                          </Form>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Panel>
              </Collapse>
            </Col>

            <Col span={12}>
              <Collapse defaultActiveKey={['1']} accordion>
                <Panel header="Monthly Subscription Plan" key="1">
                  <div className="billing-info-form">
                    <Row gutter={[16, 0]}>
                      <Col span={14}>
                        <div className="subscription-plan-list">
                          <ul>
                            <li>
                              Tier 3
                              {' '}
                              <span>1,000,00 EUR/month</span>
                            </li>
                            <li>
                              Bonus Credit
                              {' '}
                              <span>305 EUR</span>
                            </li>
                            <li>
                              Rate
                              {' '}
                              <span>11.5 / hr</span>
                            </li>
                            <li>
                              Discount
                              {' '}
                              <span>23% off Pay-As-You-Go</span>
                            </li>
                          </ul>
                        </div>
                      </Col>

                      <Col span={10}>
                        <div className="subscription-plan-list">
                          <p>
                            Your
                            {' '}
                            <span>Monthly Subscription Plan</span>
                          </p>
                          <p>will review on November 20, 2019.</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
      </div>
      <BillingHistory />
    </Wrapper>
  );
};

export default BillingInformation;
