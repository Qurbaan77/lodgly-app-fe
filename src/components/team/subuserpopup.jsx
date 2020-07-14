import React, { useState } from 'react';
import './team.css';
import {
  Form, Select, Input, Button, Checkbox, Modal, Row, Col } from 'antd';

import { userInstance } from '../../axios/axiosconfig';

const SubUserPopup = (props) => {
  const [form] = Form.useForm();
  const [bookingRead, setBookingRead] = useState(false);
  const [bookingWrite, setBookingWrite] = useState(false);
  const [propertiesRead, setPropertiesRead] = useState(false);
  const [propertiesWrite, setPropertiesWrite] = useState(false);
  const [calendarRead, setCalendarRead] = useState(false);
  const [calendarWrite, setCalendarWrite] = useState(false);
  const [guestsRead, setGuestsRead] = useState(false);
  const [guestsWrite, setGuestsWrite] = useState(false);
  const [teamRead, setTeamRead] = useState(false);
  const [teamWrite, setTeamWrite] = useState(false);
  const [invoicesRead, setInvoicesRead] = useState(false);
  const [invoicesWrite, setInvoicesWrite] = useState(false);
  const [statsRead, setStatsRead] = useState(false);
  const [statsWrite, setStatsWrite] = useState(false);
  const [serviceRead, setServiceRead] = useState(false);
  const [serviceWrite, setServiceWrite] = useState(false);
  const [ownerRead, setOwnerRead] = useState(false);
  const [ownerWrite, setOwnerWrite] = useState(false);

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];

  const handleSelect = (value) => {
    if (value === 'fullaccess') {
      setBookingRead(true);
      setBookingWrite(true);
      setPropertiesRead(true);
      setPropertiesWrite(true);
      setCalendarRead(true);
      setCalendarWrite(true);
      setGuestsRead(true);
      setGuestsWrite(true);
      setTeamRead(true);
      setTeamWrite(true);
      setInvoicesRead(true);
      setInvoicesWrite(true);
      setStatsRead(true);
      setStatsWrite(true);
      setServiceRead(true);
      setServiceWrite(true);
      setOwnerRead(true);
      setOwnerWrite(true);
    } else {
      setBookingRead(false);
      setBookingWrite(false);
      setPropertiesRead(false);
      setPropertiesWrite(false);
      setCalendarRead(false);
      setCalendarWrite(false);
      setGuestsRead(false);
      setGuestsWrite(false);
      setTeamRead(false);
      setTeamWrite(false);
      setInvoicesRead(false);
      setInvoicesWrite(false);
      setStatsRead(false);
      setStatsWrite(false);
      setServiceRead(false);
      setServiceWrite(false);
      setOwnerRead(false);
      setOwnerWrite(false);
    }
  };

  const onFinish = async (values) => {
    values.bookingRead = bookingRead;
    values.bookingWrite = bookingWrite;
    values.propertiesRead = propertiesRead;
    values.propertiesWrite = propertiesWrite;
    values.calendarRead = calendarRead;
    values.calendarWrite = calendarWrite;
    values.guestsRead = guestsRead;
    values.guestsWrite = guestsWrite;
    values.teamRead = teamRead;
    values.teamWrite = teamWrite;
    values.invoicesRead = invoicesRead;
    values.invoicesWrite = invoicesWrite;
    values.statsRead = statsRead;
    values.statsWrite = statsWrite;
    values.serviceRead = serviceRead;
    values.serviceWrite = serviceWrite;
    values.ownerRead = ownerRead;
    values.ownerWrite = ownerWrite;
    values.affiliateId = userId;
    const response = await userInstance.post('/addTeam', values);
    if (response.status === 200) {
      props.getData();
      props.close();
      form.resetFields();
      setBookingRead(false);
      setBookingWrite(false);
      setPropertiesRead(false);
      setPropertiesWrite(false);
      setCalendarRead(false);
      setCalendarWrite(false);
      setGuestsRead(false);
      setGuestsWrite(false);
      setTeamRead(false);
      setTeamWrite(false);
      setInvoicesRead(false);
      setInvoicesWrite(false);
      setStatsRead(false);
      setStatsWrite(false);
      setServiceRead(false);
      setServiceWrite(false);
      setOwnerRead(false);
      setOwnerWrite(false);
    }
  };

  const handleBookingRead = (e) => (e.target.value ? setBookingRead(false) : setBookingRead(true));
  const handleBookingWrite = (e) => (e.target.value ? setBookingWrite(false) : setBookingWrite(true));
  const handlePropertiesRead = (e) => (e.target.value ? setPropertiesRead(false) : setPropertiesRead(true));
  const handlePropertiesWrite = (e) => (e.target.value ? setPropertiesWrite(false) : setPropertiesWrite(true));
  const handleCalendarRead = (e) => (e.target.value ? setCalendarRead(false) : setCalendarRead(true));
  const handleCalendarWrite = (e) => (e.target.value ? setCalendarWrite(false) : setCalendarWrite(true));
  const handleGuestsRead = (e) => (e.target.value ? setGuestsRead(false) : setGuestsRead(true));
  const handleGuestsWrite = (e) => (e.target.value ? setGuestsWrite(false) : setGuestsWrite(true));
  const handleTeamRead = (e) => (e.target.value === 'true' ? setTeamRead(false) : setTeamRead(true));
  const handleTeamWrite = (e) => (e.target.value === 'true' ? setTeamWrite(false) : setTeamWrite(true));
  const handleInvoicesRead = (e) => (e.target.value ? setInvoicesRead(false) : setInvoicesRead(true));
  const handleInvoicesWrite = (e) => (e.target.value ? setInvoicesWrite(false) : setInvoicesWrite(true));
  const handleStatsRead = (e) => (e.target.value ? setStatsRead(false) : setStatsRead(true));
  const handleStatsWrite = (e) => (e.target.value ? setStatsWrite(false) : setStatsWrite(true));
  const handleServiceRead = (e) => (e.target.value ? setServiceRead(false) : setServiceRead(true));
  const handleServiceWrite = (e) => (e.target.value ? setServiceWrite(false) : setServiceWrite(true));
  const handleOwnerRead = (e) => (e.target.value ? setOwnerRead(false) : setOwnerRead(true));
  const handleOwnerWrite = (e) => (e.target.value ? setOwnerWrite(false) : setOwnerWrite(true));
  return (
    <Modal
      title="Add New Sub-User"
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      wrapClassName="guest-modal sub-user"
    >
      <Form name="basic" form={form} onFinish={onFinish}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={8}>
            <Form.Item
              label="E-mail"
              name="email"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Role" name="role">
              <Select onSelect={(value) => handleSelect(value)}>
                <Select.Option value="subuser">Sub-User</Select.Option>
                <Select.Option value="fullaccess">Full Access</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8} />
        </Row>

        <Row>
          <div className="custom-table subuser-table">
            <table>
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>
                    <Checkbox
                      value={bookingRead}
                      onChange={(e) => handleBookingRead(e)}
                      checked={bookingRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={bookingWrite}
                      onChange={(e) => handleBookingWrite(e)}
                      checked={bookingWrite}
                    />
                  </th>
                  <th>
                    Prices and availability that are syncing with connected OTAs
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </Row>

        <Row>
          <div className="custom-table subuser-table">
            <table>
              <thead>
                <tr>
                  <th>Calendar</th>
                  <th>
                    <Checkbox
                      value={calendarRead}
                      onChange={(e) => handleCalendarRead(e)}
                      checked={calendarRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={calendarWrite}
                      onChange={(e) => handleCalendarWrite(e)}
                      checked={calendarWrite}
                    />
                  </th>
                  <th>Access Description</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Properties</td>
                  <td>
                    <Checkbox
                      value={propertiesRead}
                      onChange={(e) => handlePropertiesRead(e)}
                      checked={propertiesRead}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={propertiesWrite}
                      onChange={(e) => handlePropertiesWrite(e)}
                      checked={propertiesWrite}
                    />
                  </td>
                  <td>Booked dates on calendar</td>
                </tr>

                <tr>
                  <td>Guests</td>
                  <td>
                    <Checkbox
                      value={guestsRead}
                      onChange={(e) => handleGuestsRead(e)}
                      checked={guestsRead}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={guestsWrite}
                      onChange={(e) => handleGuestsWrite(e)}
                      checked={guestsWrite}
                    />
                  </td>
                  <td>
                    Guest check-in and checkout-out on Dashboard, sales
                    channels. eVisitor guest reporting (if eVisitor intregation
                    is set up). Sales channels and channel manager settings.
                  </td>
                </tr>

                <tr>
                  <td>Team</td>
                  <td>
                    <Checkbox
                      value={teamRead}
                      onClick={(e) => handleTeamRead(e)}
                      checked={teamRead}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={teamWrite}
                      onClick={(e) => handleTeamWrite(e)}
                      checked={teamWrite}
                    />
                  </td>
                  <td>Additional services and their settings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Row>

        <Row>
          <div className="custom-table subuser-table">
            <table>
              <thead>
                <tr>
                  <th>Invoices</th>
                  <th>Read</th>
                  <th>Write</th>
                  <th>Access Description</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Invoices</td>
                  <td>
                    <Checkbox
                      value={invoicesRead}
                      onChange={(e) => handleInvoicesRead(e)}
                      checked={invoicesRead}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={invoicesWrite}
                      onChange={(e) => handleInvoicesWrite(e)}
                      checked={invoicesWrite}
                    />
                  </td>
                  <td>Invoices, offers and invoice setting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Row>

        <Row>
          <div className="custom-table subuser-table">
            <table>
              <thead>
                <tr>
                  <th>Stats</th>
                  <th>
                    <Checkbox
                      value={statsRead}
                      onChange={(e) => handleStatsRead(e)}
                      checked={statsRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={statsWrite}
                      onChange={(e) => handleStatsWrite(e)}
                      checked={statsWrite}
                    />
                  </th>
                  <th>Stats screen</th>
                </tr>
              </thead>
            </table>
          </div>
        </Row>

        <Row>
          <div className="custom-table subuser-table">
            <table>
              <thead>
                <tr>
                  <th>Services</th>
                  <th>
                    <Checkbox
                      value={serviceRead}
                      onChange={(e) => handleServiceRead(e)}
                      checked={serviceRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={serviceWrite}
                      onChange={(e) => handleServiceWrite(e)}
                      checked={serviceWrite}
                    />
                  </th>
                  <th>
                    Property settings, invoice settings and channel manager
                    settings
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </Row>

        <Row>
          <div className="custom-table subuser-table">
            <table>
              <thead>
                <tr>
                  <th>Owner</th>
                  <th>
                    <Checkbox
                      value={ownerRead}
                      onChange={(e) => handleOwnerRead(e)}
                      checked={ownerRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={ownerWrite}
                      onChange={(e) => handleOwnerWrite(e)}
                      checked={ownerWrite}
                    />
                  </th>
                  <th>
                    Property settings, invoice settings and channel manager
                    settings
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </Row>

        <Row
          style={{
            alignItems: 'center',
            textAlign: 'right',
            marginTop: '30px',
          }}
        >
          <Col span={24}>
            <Form.Item>
              <Button style={{ marginRight: 10 }} onClick={props.close}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SubUserPopup;
