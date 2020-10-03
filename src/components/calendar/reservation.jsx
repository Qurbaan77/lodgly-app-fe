import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import './calendar.css';
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
import DeletePopup from '../property/deletepopup';
import { reservationInstance } from '../../axios/axiosconfig';
import Wrapper from '../wrapper';

const { Panel } = Collapse;

const { RangePicker } = DatePicker;

const Reservation = ({ calendarBookingDate }) => {
  const [visible, setVisible] = useState(false);
  const [visibleOfDelete, setVisibleOfDelete] = useState(false);
  const [currReservationId, setCurrReservationId] = useState(0);
  const [reservationData, setReservationData] = useState({});
  const [nights, setNights] = useState(0);
  function onChange() {}

  const handleOk = () => {
    setVisible(false);
  };

  const close = () => {
    setVisible(false);
  };

  const handleCancelDelete = () => {
    setVisibleOfDelete(false);
  };

  const remove = async () => {
    const values = {
      id: currReservationId,
    };
    const response = await reservationInstance.post('/deleteReservation', values);
    if (response.data.code === 200) {
      toast.success('Reservation delete successfully', { containerId: 'B', toastId: 'B' });
      window.location.reload();
    } else {
      toast.error('Some error occured', { containerId: 'B', toastId: 'B' });
    }
  };

  const getReservationData = async () => {
    if (Object.values(calendarBookingDate).length > 0) {
      if (Object.values(calendarBookingDate)[1].length > 0) {
        console.log('calendarBookingDate', Object.values(calendarBookingDate)[1][0].id.split(',')[1]);
        const Id = parseInt(Object.values(calendarBookingDate)[1][0].id.split(',')[1], 10);
        const values = {
          id: Id,
        };
        const response = await reservationInstance.post('/getParticularReservation', values);
        console.log('response', response);
        if (response.data.code === 200) {
          const data = response.data.reservationData[0];
          const d1 = new Date(data.startDate);
          const d2 = new Date(data.endDate);
          const diff = Math.abs(d1 - d2);
          const day = Math.floor(diff / (24 * 60 * 60 * 1000));
          setNights(day);
          setReservationData(data);
          console.log('data', data);
        }
        setVisible(true);
      }
    }
  };

  useEffect(() => {
    // if (Object.values(calendarBookingDate).length > 0) {
    //   if (Object.values(calendarBookingDate)[1].length > 0) {
    //     console.log('calendarBookingDate', Object.values(calendarBookingDate)[1][0].id.split(',')[1]);
    //     const Id = parseInt(Object.values(calendarBookingDate)[1][0].id.split(',')[1], 10);
    //     setCurrReservationId(Id);
    //     getReservationData();
    //     setVisible(true);
    //   }
    // }
    getReservationData();
  }, [calendarBookingDate]);

  return (
    <Modal
      title="Reservation"
      name="modal1"
      visible={visible}
      onOk={handleOk}
      onCancel={close}
      wrapClassName="create-booking-modal"
    >
      <Form name="basic">
        <Row
          className="reservation-info"
          style={{ alignItems: 'center', padding: '20px 20px' }}
        >
          <Col span={12}>
            <span className="reserv-id">
              ID
              {' '}
              {reservationData.id}
            </span>
            <span className="reserv-tag">AirBnB</span>
          </Col>

          <Col span={12}>
            <div className="paid">
              <span> </span>
              <Switch onChange={onChange} />
            </div>
          </Col>

          <Col span={12}>
            <h4>
              {moment(new Date(reservationData.startDate)).format('DD MMM YY')}
              {' '}
              -
              {' '}
              {moment(new Date(reservationData.endDate)).format('DD MMM YY')}
            </h4>
          </Col>

          <Col span={12}>
            <h4>
              Total: $
              {reservationData.totalAmount}
              {' '}
              EUR
            </h4>
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
            <span>
              {nights}
            </span>
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
            <span>
              {reservationData.perNight}
              {' '}
              EUR
            </span>
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
              <div className="delete-reserv" role="presentation" onClick={() => setVisibleOfDelete(true)}>
                <DeleteOutlined />
                {' '}
                Delete this reservation
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        visible={visibleOfDelete}
        onOk={handleCancelDelete}
        onCancel={handleCancelDelete}
        wrapClassName="delete-modal"
      >
        <DeletePopup
          dataObject={() => remove()}
          cancel={() => handleCancelDelete()}
        />
      </Modal>
    </Modal>
  );
};

Reservation.propTypes = {
  calendarBookingDate: PropTypes.func,
};
Reservation.defaultProps = {
  calendarBookingDate: () => {},
};

export default Reservation;
