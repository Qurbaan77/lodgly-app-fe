import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './team.css';
import {
  Form,
  Select,
  Input,
  Button,
  Checkbox,
} from 'antd';
import team from '../../assets/images/profile_user.jpg';
import { Row, Col } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

const SubUserPopup = (props) => {
  console.log(props);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [bookingRead, setBookingRead] = useState(false);
  const [bookingWrite, setBookingWrite] = useState(false);
  const [reservationRead, setReservationRead] = useState(false);
  const [reservationWrite, setReservationWrite] = useState(false);
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
  const [checked, setChecked] = useState(false);

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  const handleSelect = (value) => {
    console.log(value);
    if(value === 'fullaccess') {
      setChecked(true);
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
      
    }
  }

  console.log(calendarRead,calendarWrite);

  const onFinish = async (values) => {
    console.log('Raw values',values);
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
    console.log(values);
   const response = await userInstance.post('/addTeam', values);
   console.log(response);
   if(response.status === 200) {
     props.close();
   }
  };
  
  const handleBookingRead = e =>  e.target.checked ? setBookingRead(false) : setBookingRead(true);
  const handleBookingWrite = e => e.target.checked ? setBookingWrite(false) : setBookingWrite(true);
  const handlePropertiesRead = e => e.target.value ? setPropertiesRead(false) : setPropertiesRead(true);
  const handlePropertiesWrite = e => e.target.value ? setPropertiesWrite(false) : setPropertiesWrite(true);
  const handleCalendarRead = e => e.target.value ? setCalendarRead(false) : setCalendarRead(true);
  const handleCalendarWrite = e => e.target.value ? setCalendarWrite(false) : setCalendarWrite(true);
  const handleGuestsRead = e => e.target.value ? setGuestsRead(false) : setGuestsRead(true);
  const handleGuestsWrite = e => e.target.value ? setGuestsWrite(false) : setGuestsWrite(true);
  const handleTeamRead = e => e.target.value ? setTeamRead(false) : setTeamRead(true);
  const handleTeamWrite = e => e.target.value ? setTeamWrite(false) : setTeamWrite(true);
  const handleInvoicesRead = e => e.target.value ? setInvoicesRead(false) : setInvoicesWrite(true);
  const handleInvoicesWrite = e => e.target.value ? setInvoicesWrite(false) : setInvoicesWrite(true);
  const handleStatsRead = e => e.target.value ? setStatsRead(false) : setStatsRead(true);
  const handleStatsWrite = e => e.target.value ? setStatsWrite(false) : setStatsWrite(true);
  const handleServiceRead = e => e.target.value ? setServiceRead(false) : setServiceRead(true);
  const handleServiceWrite = e => e.target.value ? setServiceWrite(false) : setServiceWrite(true);
  return (
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
            <Select onSelect={(value)=>handleSelect(value)}>
              <Select.Option value="subuser">Sub-User</Select.Option>
              <Select.Option value="fullaccess">Full Access</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}></Col>
      </Row>

      <Row>
        <div className="custom-table subuser-table">
          <table>
            <thead>
              <tr>
                <th>Booking</th>
                <th>
                  <Checkbox value={bookingRead} onChange={(e) => handleBookingRead(e)} checked={checked}></Checkbox>
                </th>
                <th>
                  <Checkbox value={bookingWrite} onChange={(e) => handleBookingWrite(e)} checked={checked}></Checkbox>
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
                  <Checkbox value={calendarRead} onChange={(e) => handleCalendarRead(e)} checked={checked}></Checkbox>
                </th>
                <th>
                  <Checkbox value={calendarWrite} onChange={(e) => handleCalendarWrite(e)} checked={checked}></Checkbox>
                </th>
                <th>Access Description</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Properties</td>
                <td>
                  <Checkbox value={propertiesRead} onChange={(e)=>handlePropertiesRead(e)} checked={checked}></Checkbox>
                </td>
                <td>
                  <Checkbox value={propertiesWrite} onChange={(e)=>handlePropertiesWrite(e)} checked={checked}></Checkbox>
                </td>
                <td>Booked dates on calendar</td>
              </tr>

              <tr>
                <td>Guests</td>
                <td>
                  <Checkbox value={guestsRead} onChange={(e)=>handleGuestsRead(e)} checked={checked}></Checkbox>
                </td>
                <td>
                  <Checkbox value={guestsWrite} onChange={(e)=>handleGuestsWrite(e)} checked={checked}></Checkbox>
                </td>
                <td>
                  Guest check-in and checkout-out on Dashboard, sales channels.
                  eVisitor guest reporting (if eVisitor intregation is set up).
                  Sales channels and channel manager settings.
                </td>
              </tr>

              <tr>
                <td>Team</td>
                <td>
                  <Checkbox value={teamRead} onClick={(e) => handleTeamRead(e)} checked={checked}></Checkbox>
                </td>
                <td>
                  <Checkbox value={teamWrite} onClick={(e) => handleTeamWrite(e)} checked={checked}></Checkbox>
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
                  <Checkbox value={invoicesRead} onChange={(e)=>handleInvoicesRead(e)} checked={checked}></Checkbox>
                </td>
                <td>
                  <Checkbox value={invoicesWrite} onChange={(e)=>handleInvoicesWrite(e)} checked={checked}></Checkbox>
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
                  <Checkbox value={statsRead} onChange={(e)=>handleStatsRead(e)} checked={checked}></Checkbox>
                </th>
                <th>
                  <Checkbox value={statsWrite} onChange={(e)=>handleStatsWrite(e)} checked={checked}></Checkbox>
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
                  <Checkbox value={serviceRead} onChange={(e)=>handleServiceRead(e)} checked={checked}></Checkbox>
                </th>
                <th>
                  <Checkbox value={serviceWrite} onChange={(e)=>handleServiceWrite(e)} checked={checked}></Checkbox>
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
        style={{ alignItems: 'center', textAlign: 'right', marginTop: '30px' }}
      >
        <Col span={24}>
          <Form.Item>
            <Button style={{ marginRight: 10 }} onClick={props.close}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SubUserPopup;
