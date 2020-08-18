import React, { useState } from 'react';
import './calendar.css';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Select,
  Input,
  Switch,
  Radio,
  DatePicker,
  Button,
  // Checkbox,
  Row,
  Col,
  Avatar,
  Collapse,
  Modal,
  // Menu,
} from 'antd';
import {
  PlusOutlined,
  PlusSquareOutlined,
  BellOutlined,
  DeleteOutlined,
  FormOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';

const { Panel } = Collapse;

const { RangePicker } = DatePicker;

const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;

const Popup = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const cancel = () => {
    setVisible(false);
  };

  const [visible1, setVisible1] = useState(false);

  const show1 = () => {
    setVisible1(true);
  };

  const cancel1 = () => {
    setVisible1(false);
  };

  const [visible2, setVisible2] = useState(false);

  const show2 = () => {
    setVisible2(true);
  };

  const cancel2 = () => {
    setVisible2(false);
  };

  const [visible3, setVisible3] = useState(false);

  const show3 = () => {
    setVisible3(true);
  };

  const cancel3 = () => {
    setVisible3(false);
  };

  return (
    <Wrapper>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        style={{ marginRight: 20 }}
      >
        {t('calendarpop.heading1')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show1}
        style={{ marginRight: 20 }}
      >
        {t('calendarpop.heading2')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show2}
        style={{ marginRight: 20 }}
      >
        {t('calendarpop.heading3')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show3}
        style={{ marginRight: 20 }}
      >
        {t('strings.reservat')}
      </Button>

      <Modal
        title={t('strings.guest')}
        visible={visible}
        onCancel={cancel}
        wrapClassName="guest-modal"
      >
        <UpdateGuest />
      </Modal>

      <Modal
        title={t('calendarpop.heading4')}
        visible={visible1}
        onCancel={cancel1}
        wrapClassName="create-booking-modal group-reservation"
      >
        <GroupReservation />
      </Modal>

      <Modal
        title={t('calendarpop.heading3')}
        visible={visible2}
        onCancel={cancel2}
        wrapClassName="create-booking-modal calendar-setting"
      >
        <CalendarSetting />
      </Modal>

      <Modal
        title={t('strings.reservation')}
        visible={visible3}
        onCancel={cancel3}
        wrapClassName="create-booking-modal reservation-setting"
      >
        <Reservation />
      </Modal>
    </Wrapper>
  );
};

export default Popup;

const UpdateGuest = () => {
  const { t } = useTranslation();
  return (
    <Form name="basic">
      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <Form.Item
            label={t('strings.full')}
            name="firstname"
            style={{ paddingRight: 20 }}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Country of Residence" name="lastname">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <Form.Item
            label={t('strings.email')}
            name="email"
            style={{ paddingRight: 20 }}
          >
            <Input placeholder={t('strings.email')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('strings.phone')} name="phone">
            <Input placeholder={t('strings.phone')} />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <Form.Item
            name="dob"
            label={t('calendarpop.label1')}
            style={{ paddingRight: 20 }}
          >
            <DatePicker />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="gender" label={t('strings.gender')}>
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>M</Radio>
              <Radio value={2}>F</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <Form.Item
            label={t('calendarpop.label2')}
            name="document"
            style={{ paddingRight: 20 }}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('calendarpop.label3')} name="documentnumber">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <Form.Item
            label={t('calendarpop.label5')}
            name="citizenship"
            style={{ paddingRight: 20 }}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('calendarpop.label4')} name="documentnumber">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }}>
        <Col span={24}>
          <Form.Item label={t('strings.note')} name="notes">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center', textAlign: 'right' }}>
        <Col span={24}>
          <Form.Item>
            <Button style={{ marginRight: 10 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {t('strings.update')}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const GroupReservation = () => {
  const { t } = useTranslation();
  return (
    <Form name="basic">
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
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>Confirmed</Radio>
            <Radio value={2}>Option</Radio>
          </Radio.Group>
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
            label={t('strings.channel_commission')}
            name="channel"
          >

            <Input
              style={{
                width: '26%',
                display: 'inline-block',
                verticalAlign: 'sub',
                marginLeft: '4%',
              }}
            />
          </Form.Item>
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
                <p>{t('strings.name')}</p>
              </Col>

              <Col span={12}>
                <label htmlFor="country">
                  <input hidden />
                  {t('strings.country')}
                </label>
                <p>Germany</p>
              </Col>

              <Col span={12}>
                <label htmlFor="email">
                  <input hidden />
                  {t('strings.email')}
                </label>
                <p>test@gmail.com</p>
              </Col>

              <Col span={12}>
                <label htmlFor="phone">
                  <input hidden />
                  {t('strings.phone')}
                </label>
                <p>+123456789</p>
              </Col>
            </Row>
          </div>

          <div className="add-edit-data">
            <div href="">
              <FormOutlined />
              {t('calendarpop.label8')}
            </div>
          </div>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }}>
        <Col span={24}>
          <Form.Item style={{ marginBottom: '0' }}>
            <Collapse accordion>
              <Panel
                icon={<PlusSquareOutlined />}
                header="Add Guest Details (Optional)"
                key="1"
              >
                {text}
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
  );
};

const CalendarSetting = () => {
  const { t } = useTranslation();
  function onChange() {}

  return (
    <div className="filter-box">
      <Form name="basic">
        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Form.Item label={t('calendarpop.label16')} name="property">
              <Select style={{ marginBottom: '10px' }}>
                <Select.Option value="demo">All Property</Select.Option>
                <Select.Option value="demo">All Property</Select.Option>
              </Select>

              <Select>
                <Select.Option value="demo">All Property</Select.Option>
                <Select.Option value="demo">All Property</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label={t('calendarpop.label17')} name="status">
              <Select>
                <Select.Option value="demo">All Property</Select.Option>
                <Select.Option value="demo">All Property</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <ul className="filter-list">
                <li>
                  <span className="uppercase">{t('calendarpop.label16')}</span>
                  <Switch defaultChecked onChange={onChange} />
                </li>
              </ul>

              <h4>{t('calendarpop.label9')}</h4>

              <ul
                className="filter-list"
                style={{ margin: '0', padding: '0', border: 'none' }}
              >
                <li>
                  <span>{t('calendarpop.label10')}</span>
                  <Switch defaultChecked onChange={onChange} />
                </li>

                <li>
                  <span>{t('calendarpop.label11')}</span>
                  <Switch onChange={onChange} />
                </li>

                <li>
                  <span>{t('calendarpop.label12')}</span>
                  <Switch onChange={onChange} />
                </li>

                <li>
                  <span>{t('calendarpop.label13')}</span>
                  <Switch onChange={onChange} />
                </li>

                <li>
                  <span>{t('calendarpop.label14')}</span>
                  <Switch onChange={onChange} />
                </li>

                <li>
                  <span>{t('calendarpop.label15')}</span>
                  <Switch onChange={onChange} />
                </li>
              </ul>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const Reservation = () => {
  // const { t } = useTranslation();
  function onChange() {}

  return (
    <Form name="basic">
      <Row
        className="reservation-info"
        style={{ alignItems: 'center', padding: '20px 20px' }}
      >
        <Col span={12}>
          <span className="reserv-id">ID 1235378</span>
          <span className="reserv-tag">AirBnB</span>
        </Col>

        <Col span={12}>
          <div className="paid">
            <span> </span>
            <Switch onChange={onChange} />
          </div>
        </Col>

        <Col span={12}>
          <h4>20.06 - 30.06.19</h4>
        </Col>

        <Col span={12}>
          <h4>Total: 1000,00 EUR</h4>
        </Col>
      </Row>

      <Row
        className="reservation-info"
        style={{ alignItems: 'center', padding: '5px 20px' }}
      >
        <Col span={8}>
          <span>Total nights:</span>
        </Col>

        <Col span={6}>
          <span>10 </span>
        </Col>

        <Col span={10}>
          <span>Service Cost: 0,00 EUR</span>
        </Col>
      </Row>

      <Row
        className="reservation-info"
        style={{ alignItems: 'center', padding: '5px 20px' }}
      >
        <Col span={8}>
          <span>Price per nights:</span>
        </Col>

        <Col span={6}>
          <span>100,00 EUR</span>
        </Col>

        <Col span={10}>
          <span>Standard Rate</span>
        </Col>
      </Row>

      <Row
        className="reservation-info"
        style={{ alignItems: 'center', padding: '5px 20px' }}
      >
        <Col span={8}>
          <span>Adults:</span>
        </Col>

        <Col span={6}>
          <span>1</span>
        </Col>

        <Col span={10}>
          <span />
        </Col>
      </Row>

      <Row
        className="reservation-info"
        style={{ alignItems: 'center', padding: '5px 20px' }}
      >
        <Col span={8}>
          <span>Children:</span>
        </Col>

        <Col span={6}>
          <span>0</span>
        </Col>

        <Col span={10}>
          <span />
        </Col>
      </Row>

      <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
        <Col span={24}>
          <div className="add-edit-data">
            <div href="">
              <FormOutlined />
              {' '}
              Add Note
            </div>
            <Form.Item style={{ display: 'none' }}>
              <Input.TextArea placeholder="Internal Note" />
            </Form.Item>
          </div>

          <div className="add-edit-data">
            <div href="">
              <BellOutlined />
              {' '}
              Add Task
            </div>
            <Form.Item style={{ display: 'none' }}>
              <Input.TextArea placeholder="Add New Task" />
            </Form.Item>
          </div>
        </Col>
      </Row>

      <Row
        className="reservation-user"
        style={{ alignItems: 'center', padding: '0px 20px' }}
      >
        <div className="user-box">
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            KB
          </Avatar>
          <p>Kurtis Baraccano</p>
        </div>
        <div className="user-box">
          <Avatar icon={<PlusOutlined />} />
          <p>Add Guest</p>
        </div>
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
            <Button style={{ marginRight: 10 }}>Edit Reservation</Button>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Check In
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <div href="" className="delete-reserv">
              <DeleteOutlined />
              {' '}
              Delete this reservation
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
