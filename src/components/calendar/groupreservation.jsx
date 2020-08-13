import React from 'react';
import PropTypes from 'prop-types';
import './calendar.css';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Select,
  Input,
  Radio,
  DatePicker,
  Button,
  // Checkbox,
  Row,
  Col,
  Collapse,
  Modal,
  // Menu,
} from 'antd';
import {
  PlusSquareOutlined,
} from '@ant-design/icons';

const { Panel } = Collapse;

const { RangePicker } = DatePicker;

const GroupReservation = (props) => {
  const { t } = useTranslation();
  const {
    close, visible, userData, data,
  } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      title={t('calendarpop.heading4')}
      visible={visible}
      onCancel={close}
      wrapClassName="create-booking-modal group-reservation"
    >
      <Form form={form} name="basic">
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={24}>
            <Form.Item
              label={t('strings.reservation_date')}
              name="groupname"
              style={{ paddingRight: 20 }}
            >
              <RangePicker />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="radiogroup" label="Radio.Group">
              <Radio.Group>
                <Radio value="confirmed">Confirmed</Radio>
                <Radio value="option">Option</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <div className="availability">
              <p>{t('calendarpop.label6')}</p>
            </div>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={24}>
            <Form.Item
              className="comision"
              label={t('addreservation.heading6')}
              name="channel"
            >
              <Select
                placeholder="Select"
                // onSelect={(value, event) => fun5(value, event)}
                style={{ width: '70%', display: 'inline-block' }}
              >
                <Select.Option value="Airbnb">Airbnb</Select.Option>
                <Select.Option value="Booking">Booking</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={24}>
            <Form.Item
              className="comision"
              label={t('addreservation.heading6')}
              name="commissionPercentage"
            >
              <Input
                name="commission"
                style={{
                  width: '26%',
                  display: 'inline-block',
                  verticalAlign: 'top',
                  marginLeft: '4%',
                }}

                rules={[
                  {
                    required: true,
                    message: t('addreservation.heading8'),
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row
          style={{
            alignItems: 'center',
            padding: '0px 20px',
            // marginBottom: '20px',
            background: '#fbfbfc',
            paddingTop: '20px',
          }}
          // hidden
        >
          {data.map((el) => (
            <Col span={24}>
              <div
                className="reservation-booker select-unit-reservation"
                id={el}
              >
                <Row>
                  <Col span={12} className="unit-available">
                    {/* <label>Units</label> */}
                    <p>dataunitTypeName</p>
                    <span>Available : el.noOfUnits</span>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Number of units" name={[el, 'units']}>
                      <Input />
                      {/* <Select style={{ width: '50%', display: 'inline-block' }}>
                        {Array.from(Array(el.noOfUnits).keys()).map(
                          (ele, i) => (
                            <Select.Option value={ele} key={i}>
                              {ele + 1}
                            </Select.Option>
                          )
                        )}
                      </Select> */}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Price per night/unit"
                      name={[el, 'pricePer']}
                    >
                      <Input
                        style={{
                          width: '50%',
                          display: 'inline-block',
                          marginRight: '10px',
                        }}
                      />
                      <span>EUR</span>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Total per unit type"
                      name={[el, 'amount']}
                    >
                      <Input
                        style={{
                          width: '50%',
                          display: 'inline-block',
                          marginRight: '10px',
                        }}
                      />
                      <span>EUR</span>
                    </Form.Item>
                  </Col>

                </Row>
              </div>

              {/* <div className="price-per-night">
                <h4>Price per night</h4>

                <div className="night-container">
                  <div className="night-box">
                    <label>20.06</label>
                    <Input />
                  </div>

                  <div className="night-box">
                    <label>20.06</label>
                    <Input />
                  </div>

                  <div className="night-box">
                    <label>20.06</label>
                    <Input />
                  </div>

                  <div className="night-box">
                    <label>20.06</label>
                    <Input />
                  </div>

                  <div className="night-box">
                    <label>20.06</label>
                    <Input />
                  </div>

                  <div className="night-box">
                    <label>20.06</label>
                    <Input />
                  </div>

                  <div className="night-box">
                    <label>20.06</label>
                    <Input />
                  </div>
                </div>
              </div> */}
            </Col>
          ))}
        </Row>

        <Row
          style={{
            alignItems: 'center',
            padding: '20px 20px',
            border: '1px solid #ddd',
            marginBottom: '20px',
          }}
        >
          <Col span={24}>
            <div className="discount-night">
              <span>Discount (%)</span>
              <Input />

              <div className="discount-box">
                <h2>$125</h2>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={24}>
            <div className="reservation-booker">
              <h4>{t('calendarpop.label7')}</h4>

              <Row>
                <Col span={12}>
                  <label htmlFor="name">
                    <input hidden />
                    {t('strings.full')}
                  </label>
                  <p>{userData.length > 0 ? userData[0].fullname : null}</p>
                </Col>

                <Col span={12}>
                  <label htmlFor="email">
                    <input hidden />
                    {t('strings.email')}
                  </label>
                  <p>{userData.length > 0 ? userData[0].email : null}</p>
                </Col>

                <Col span={12}>
                  <label htmlFor="phone">
                    <input hidden />
                    {t('strings.phone')}
                  </label>
                  <p>{userData.length > 0 ? userData[0].phone : null}</p>
                </Col>

                {/* <Col span={24}>
              <div className="additional-edit">
                <div>
                  <EditOutlined />
                  {' '}
                  {t('addreservation.heading1')}
                </div>
              </div>
            </Col> */}
              </Row>
            </div>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Form.Item style={{ marginBottom: '0' }}>
              <Collapse accordion>
                <Panel
                  icon={<PlusSquareOutlined />}
                  header="Add Notes (Optional)"
                  key="2"
                >
                  <div className="add-notes">
                    <Form.Item name="notes1">
                      <Input.TextArea />
                    </Form.Item>
                  </div>
                </Panel>
              </Collapse>
            </Form.Item>
          </Col>
        </Row>

        <Row
          style={{
            alignItems: 'center',
            background: '#fbfbfc',
            padding: '0px 20px',
            paddingTop: '20px',
          }}
        >
          <Col span={24}>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                {t('strings.save')}
                {' '}
                {t('strings.reservat')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

GroupReservation.propTypes = {
  close: PropTypes.func,
  userData: PropTypes.func,
  data: PropTypes.func,
  visible: PropTypes.bool,
};
GroupReservation.defaultProps = {
  close: () => {},
  userData: () => {},
  data: () => {},
  visible: false,
};

export default GroupReservation;
