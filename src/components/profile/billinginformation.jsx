import React, { useEffect, useState } from 'react';
import './profile.css';
import {
  Form, Select, Input, Row, Col, Collapse,
} from 'antd';
import { UserOutlined, WarningOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';

import BillingHistory from './billinghistory';
import { basicPrice, advancePrice, discount } from '../../config/keys';
import { userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

const BillingInformation = () => {
  const [form] = Form.useForm();
  const [totalUnit, setTotalUnit] = useState(null);
  const [unitDropDown, setUnitDropDown] = useState([]);
  const [total, setTotal] = useState(null);
  const [unitPrice, setUnitPrice] = useState(basicPrice);
  const [unitsSelected, setUnitsSelected] = useState();
  const [planType, setPlanType] = useState('basic');
  const [subscriptionType, setSubscriptionType] = useState('month');

  console.log(unitDropDown);
  useEffect(() => {
    const getData = async () => {
      const res = await userInstance.post('/getTotalUnit');
      console.log(res.data);
      if (res.data.code === 200) {
        const units = res.data.data;
        setTotalUnit(units);
        const range = Array(units + 50 - units + 1).fill().map((_, idx) => units + idx);
        setUnitDropDown(range);
      }
    };
    getData();
  }, []);

  const handlePlanSelect = (e) => {
    setPlanType(e);
    if (e === 'advance') {
      setUnitPrice(advancePrice);
    } else {
      setUnitPrice(basicPrice);
    }
  };
  const handleUnitSelect = (e) => {
    setUnitsSelected(e);
    setTotal(e * unitPrice);
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
                            You have trial period active untill 4.07.2020.
                          </div>
                          <div className="invoice-error" hidden>
                            <CloseCircleOutlined hidden />
                            {' '}
                            Payment method not set. Please update your payment method.
                          </div>
                          <Form>
                            <Row gutter={[16, 0]}>
                              <Col span={6}>
                                <Form.Item label="Subscription Type">
                                  <Select defaultValue="basic" placeholder="basic" onSelect={handlePlanSelect}>
                                    <Select.Option value="advance">Advance</Select.Option>
                                    <Select.Option value="basic">Basic</Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>

                              <Col span={5}>
                                <Form.Item label="price Per Unit" name="pricePerUnit">
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
                                  <Select placeholder="units" onSelect={handleUnitSelect}>
                                    {
                                      unitDropDown.map((el) => (
                                        <Select.Option value={el}>{el}</Select.Option>
                                      ))
                                    }

                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={6}>
                                <Form.Item label="Plan Type">
                                  <Select defaultValue="Monthly" placeholder="Monthly" onSelect={handlePlanType}>
                                    <Select.Option value="month">Monthly</Select.Option>
                                    <Select.Option value="year">Yearly</Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>

                              <Col span={6}>
                                <Form.Item label="currency">
                                  <Select defaultValue="EUR" placeholder="Eur" onSelect={handlePlanType}>
                                    <Select.Option value="EUR">EUR</Select.Option>
                                    <Select.Option value="CHF">CHF</Select.Option>
                                    <Select.Option value="ZL">ZL</Select.Option>
                                    <Select.Option value="GPB">GPB</Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>


                              <Col span={9} className="total-billing-price">
                                <Form.Item label="Total Price">
                                  <h2>
                                    =
                                    {' '}
                                    {total}
                                    <span>
                                      {' '}
                                      per
                                      {' '}
                                      {subscriptionType}
                                    </span>
                                  </h2>
                                  <p>-VAT based on your location</p>
                                </Form.Item>
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
