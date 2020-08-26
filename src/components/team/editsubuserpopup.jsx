import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './team.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  Form, Select, Input, Button, Checkbox, Modal, Row, Col,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
// import team from '../../assets/images/profile_user.jpg';

import { userInstance } from '../../axios/axiosconfig';

const EditSubUserPopup = (props) => {
  const { t } = useTranslation();
  const {
    subUserData, getData, close, handleOk, handleCancel, visible,
  } = props;
  const [form] = Form.useForm();
  const [bookingRead, setBookingRead] = useState(false);
  const [bookingWrite, setBookingWrite] = useState(false);
  const [bookingDelete, setBookingDelete] = useState(false);
  const [propertiesRead, setPropertiesRead] = useState(false);
  const [propertiesWrite, setPropertiesWrite] = useState(false);
  const [propertiesDelete, setPropertiesDelete] = useState(false);
  const [calendarRead, setCalendarRead] = useState(false);
  const [calendarWrite, setCalendarWrite] = useState(false);
  const [calendarDelete, setCalendarDelete] = useState(false);
  const [guestsRead, setGuestsRead] = useState(false);
  const [guestsWrite, setGuestsWrite] = useState(false);
  const [guestsDelete, setGuestsDelete] = useState(false);
  const [teamRead, setTeamRead] = useState(false);
  const [teamWrite, setTeamWrite] = useState(false);
  const [teamDelete, setTeamDelete] = useState(false);
  const [invoicesRead, setInvoicesRead] = useState(false);
  const [invoicesWrite, setInvoicesWrite] = useState(false);
  const [invoicesDelete, setInvoicesDelete] = useState(false);
  const [statsRead, setStatsRead] = useState(false);
  const [statsWrite, setStatsWrite] = useState(false);
  const [statsDelete, setStatsDelete] = useState(false);
  const [serviceRead, setServiceRead] = useState(false);
  const [serviceWrite, setServiceWrite] = useState(false);
  const [serviceDelete, setServiceDelete] = useState(false);
  const [ownerRead, setOwnerRead] = useState(false);
  const [ownerWrite, setOwnerWrite] = useState(false);
  const [ownerDelete, setOwnerDelete] = useState(false);
  const [billingRead, setBillingRead] = useState(false);
  const [billingWrite, setBillingWrite] = useState(false);
  const [billingDelete, setBillingDelete] = useState(false);
  const [hideWrite, setHideWrite] = useState(true);
  const [hideDelete, setHideDelete] = useState(true);
  const [clickedOnRead, setClickedOnRead] = useState(true);

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];
  const updateValues = useCallback(() => {
    form.setFieldsValue({
      email: subUserData.email,
      role: subUserData.role,
    });
    if (subUserData.role === 'read') {
      setHideWrite(true);
      setHideDelete(true);
    } else if (subUserData.role === 'write') {
      setHideWrite(false);
      setHideDelete(true);
    } else {
      setHideDelete(false);
      setHideWrite(false);
    }
    setBookingRead(subUserData.bookingRead);
    setBookingWrite(subUserData.bookingWrite);
    setBookingDelete(subUserData.bookingDelete);
    setPropertiesRead(subUserData.propertiesRead);
    setPropertiesWrite(subUserData.propertiesWrite);
    setPropertiesDelete(subUserData.propertiesDelete);
    setCalendarRead(subUserData.calendarRead);
    setCalendarWrite(subUserData.calendarWrite);
    setCalendarDelete(subUserData.calendarDelete);
    setGuestsRead(subUserData.guestsRead);
    setGuestsWrite(subUserData.guestsWrite);
    setGuestsDelete(subUserData.guestsDelete);
    setTeamRead(subUserData.teamRead);
    setTeamWrite(subUserData.teamWrite);
    setTeamDelete(subUserData.teamDelete);
    setInvoicesRead(subUserData.invoicesRead);
    setInvoicesWrite(subUserData.invoicesWrite);
    setInvoicesDelete(subUserData.invoicesDelete);
    setStatsRead(subUserData.statsRead);
    setStatsWrite(subUserData.statsWrite);
    setStatsDelete(subUserData.statsDelete);
    setServiceRead(subUserData.serviceRead);
    setServiceWrite(subUserData.serviceWrite);
    setServiceDelete(subUserData.serviceDelete);
    setOwnerRead(subUserData.ownerRead);
    setOwnerWrite(subUserData.ownerWrite);
    setOwnerDelete(subUserData.ownerDelete);
    setBillingWrite(subUserData.billingWrite);
    setBillingRead(subUserData.billingRead);
    setBillingDelete(subUserData.billingDelete);
  }, [subUserData, form]);

  useEffect(() => {
    updateValues();
  }, [visible, updateValues]);

  const handleSelect = (value) => {
    if (value === 'read') {
      if (clickedOnRead) {
        setClickedOnRead(false);
      } else {
        setClickedOnRead(true);
      }
    }
    if (value === 'fullaccess') {
      setHideDelete(false);
      setHideWrite(false);
      setBookingRead(true);
      setBookingWrite(true);
      setBookingDelete(true);
      setPropertiesRead(true);
      setPropertiesWrite(true);
      setPropertiesDelete(true);
      setCalendarRead(true);
      setCalendarWrite(true);
      setCalendarDelete(true);
      setGuestsRead(true);
      setGuestsWrite(true);
      setGuestsDelete(true);
      setTeamRead(true);
      setTeamWrite(true);
      setTeamDelete(true);
      setInvoicesRead(true);
      setInvoicesWrite(true);
      setInvoicesDelete(true);
      setStatsRead(true);
      setStatsWrite(true);
      setStatsDelete(true);
      setServiceRead(true);
      setServiceWrite(true);
      setServiceDelete(true);
      setOwnerRead(true);
      setOwnerWrite(true);
      setOwnerDelete(true);
      setBillingRead(true);
      setBillingWrite(true);
      setBillingDelete(true);
    } else if (value === 'write') {
      setHideWrite(false);
      setHideDelete(true);
      setBookingRead(true);
      setBookingWrite(true);
      setBookingDelete(false);
      setPropertiesRead(true);
      setPropertiesWrite(true);
      setPropertiesDelete(false);
      setCalendarRead(true);
      setCalendarWrite(true);
      setCalendarDelete(false);
      setGuestsRead(true);
      setGuestsWrite(true);
      setGuestsDelete(false);
      setTeamRead(true);
      setTeamWrite(true);
      setTeamDelete(false);
      setInvoicesRead(true);
      setInvoicesWrite(true);
      setInvoicesDelete(false);
      setStatsRead(true);
      setStatsWrite(true);
      setStatsDelete(false);
      setServiceRead(true);
      setServiceWrite(true);
      setServiceDelete(false);
      setOwnerRead(true);
      setOwnerWrite(true);
      setOwnerDelete(false);
      setBillingRead(true);
      setBillingWrite(true);
      setBillingDelete(false);
    } else if (value === 'read') {
      if (clickedOnRead) {
        setHideWrite(true);
        setHideDelete(true);
        setBookingRead(true);
        setBookingWrite(false);
        setBookingDelete(false);
        setPropertiesRead(true);
        setPropertiesWrite(false);
        setPropertiesDelete(false);
        setCalendarRead(true);
        setCalendarWrite(false);
        setCalendarDelete(false);
        setGuestsRead(true);
        setGuestsWrite(false);
        setGuestsDelete(false);
        setTeamRead(true);
        setTeamWrite(false);
        setTeamDelete(false);
        setInvoicesRead(true);
        setInvoicesWrite(false);
        setInvoicesDelete(false);
        setStatsRead(true);
        setStatsWrite(false);
        setStatsDelete(false);
        setServiceRead(true);
        setServiceWrite(false);
        setServiceDelete(false);
        setOwnerRead(true);
        setOwnerWrite(false);
        setOwnerDelete(false);
        setBillingRead(true);
        setBillingWrite(false);
        setBillingDelete(false);
      } else {
        makeEverythingUncheck();
      }
    }
  };

  const makeEverythingUncheck = () => {
    setBookingRead(false);
    setBookingWrite(false);
    setBookingDelete(false);
    setPropertiesRead(false);
    setPropertiesWrite(false);
    setPropertiesDelete(false);
    setCalendarRead(false);
    setCalendarWrite(false);
    setCalendarDelete(false);
    setGuestsRead(false);
    setGuestsWrite(false);
    setGuestsDelete(false);
    setTeamRead(false);
    setTeamWrite(false);
    setTeamDelete(false);
    setInvoicesRead(false);
    setInvoicesWrite(false);
    setInvoicesDelete(false);
    setStatsRead(false);
    setStatsWrite(false);
    setStatsDelete(false);
    setServiceRead(false);
    setServiceWrite(false);
    setServiceDelete(false);
    setOwnerRead(false);
    setOwnerWrite(false);
    setOwnerDelete(false);
    setBillingRead(false);
    setBillingWrite(false);
    setBillingDelete(false);
  };

  const onFinish = async (values) => {
    values.bookingRead = bookingRead;
    values.bookingWrite = bookingWrite;
    values.bookingDelete = bookingDelete;
    values.propertiesRead = propertiesRead;
    values.propertiesWrite = propertiesWrite;
    values.propertiesDelete = propertiesDelete;
    values.calendarRead = calendarRead;
    values.calendarWrite = calendarWrite;
    values.calendarDelete = calendarDelete;
    values.guestsRead = guestsRead;
    values.guestsWrite = guestsWrite;
    values.guestsDelete = guestsDelete;
    values.teamRead = teamRead;
    values.teamWrite = teamWrite;
    values.teamDelete = teamDelete;
    values.invoicesRead = invoicesRead;
    values.invoicesWrite = invoicesWrite;
    values.invoicesDelete = invoicesDelete;
    values.statsRead = statsRead;
    values.statsWrite = statsWrite;
    values.statsDelete = statsDelete;
    values.serviceRead = serviceRead;
    values.serviceWrite = serviceWrite;
    values.serviceDelete = serviceDelete;
    values.ownerRead = ownerRead;
    values.ownerWrite = ownerWrite;
    values.ownerDelete = ownerDelete;
    values.affiliateId = userId;
    values.billingRead = billingRead;
    values.billingWrite = billingWrite;
    values.billingDelete = billingDelete;
    const companyName = window.location.hostname.split('.');
    values.company = companyName[0];
    const response = await userInstance.post('/updateSubUser', values);
    if (response.data.code === 200) {
      getData();
      close();
      toast.success('Sub-User Details updated successfully', { containerId: 'B' });
    } else {
      toast.error('some error occurred!', { containerId: 'B' });
    }
  };

  const handleBookingRead = (e) => (e.target.value ? setBookingRead(false) : setBookingRead(true));
  const handleBookingWrite = (e) => (e.target.value
    ? setBookingWrite(false) : setBookingWrite(true));
  const handleBookingDelete = (e) => (e.target.value ? setBookingDelete(false)
    : setBookingDelete(true));
  const handlePropertiesRead = (e) => (e.target.value
    ? setPropertiesRead(false) : setPropertiesRead(true));
  const handlePropertiesWrite = (e) => (e.target.value
    ? setPropertiesWrite(false) : setPropertiesWrite(true));
  const handlePropertiesDelete = (e) => (e.target.value ? setPropertiesDelete(false)
    : setPropertiesDelete(true));
  const handleCalendarRead = (e) => (e.target.value
    ? setCalendarRead(false) : setCalendarRead(true));
  const handleCalendarWrite = (e) => (e.target.value
    ? setCalendarWrite(false) : setCalendarWrite(true));
  const handleCalendarDelete = (e) => (e.target.value ? setCalendarDelete(false)
    : setCalendarDelete(true));
  const handleGuestsRead = (e) => (e.target.value ? setGuestsRead(false) : setGuestsRead(true));
  const handleGuestsWrite = (e) => (e.target.value ? setGuestsWrite(false) : setGuestsWrite(true));
  const handleGuestsDelete = (e) => (e.target.value ? setGuestsDelete(false)
    : setGuestsDelete(true));
  const handleTeamRead = (e) => (e.target.value === 'true' ? setTeamRead(false) : setTeamRead(true));
  const handleTeamWrite = (e) => (e.target.value === 'true' ? setTeamWrite(false) : setTeamWrite(true));
  const handleTeamDelete = (e) => (e.target.value ? setPropertiesDelete(false)
    : setPropertiesDelete(true));
  const handleInvoicesRead = (e) => (e.target.value
    ? setInvoicesRead(false) : setInvoicesRead(true));
  const handleInvoicesWrite = (e) => (e.target.value
    ? setInvoicesWrite(false) : setInvoicesWrite(true));
  const handleInvoicesDelete = (e) => (e.target.value ? setPropertiesDelete(false)
    : setPropertiesDelete(true));
  const handleStatsRead = (e) => (e.target.value ? setStatsRead(false) : setStatsRead(true));
  const handleStatsWrite = (e) => (e.target.value ? setStatsWrite(false) : setStatsWrite(true));
  const handleStatsDelete = (e) => (e.target.value ? setStatsDelete(false)
    : setStatsDelete(true));
  const handleServiceRead = (e) => (e.target.value ? setServiceRead(false) : setServiceRead(true));
  const handleServiceWrite = (e) => (e.target.value
    ? setServiceWrite(false) : setServiceWrite(true));
  const handleServiceDelete = (e) => (e.target.value ? setServiceDelete(false)
    : setServiceDelete(true));
  const handleOwnerRead = (e) => (e.target.value ? setOwnerRead(false) : setOwnerRead(true));
  const handleOwnerWrite = (e) => (e.target.value ? setOwnerWrite(false) : setOwnerWrite(true));
  const handleOwnerDelete = (e) => (e.target.value ? setOwnerDelete(false)
    : setOwnerDelete(true));
  const handleBillingRead = (e) => (e.target.value ? setBillingRead(false) : setBillingRead(true));
  const handleBillingWrite = (e) => (e.target.value ? setBillingWrite(false)
    : setBillingWrite(true));
  const handleBillingDelete = (e) => (e.target.value ? setBillingDelete(false)
    : setBillingDelete(true));

  const handleCross = () => close();

  return (
    <Modal
      title="Add New Sub-User"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal sub-user"
    >
      <Helmet>
        <body className={visible ? 'ant-scrolling-effect' : ''} />
      </Helmet>
      <div className="cross-btn">
        <CloseOutlined onClick={handleCross} />
      </div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <div className="subuser-fields-section">
          <Row style={{ alignItems: 'center' }}>
            <Col span={10}>
              <Form.Item
                label={t('strings.email')}
                name="email"
                style={{ paddingRight: 20 }}
                rules={[
                  {
                    type: 'email',
                    message: t('subuserpopup.label1'),
                  },
                  {
                    required: true,
                    message: t('subuserpopup.label2'),
                  },
                ]}
              >
                <Input placeholder={t('strings.email')} disabled />
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item label={t('subuserpopup.label25')} name="role">
                <Select
                  placeholder={t('subuserpopup.label3')}
                  onSelect={(value) => handleSelect(value)}
                >
                  <Select.Option value="read">
                    Read
                  </Select.Option>
                  <Select.Option value="write">
                    Write
                  </Select.Option>
                  <Select.Option value="fullaccess">
                    Full Access
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} />
          </Row>
        </div>

        <Row>
          <div className="custom-table subuser-table">
            <table>
              <thead>
                <tr>
                  <th>
                    {' '}
                    {t('subuserpopup.name')}
                  </th>
                  <th>
                    {' '}
                    {t('subuserpopup.label16')}
                  </th>
                  <th>
                    {' '}
                    {t('subuserpopup.label17')}
                  </th>
                  <th>
                    {' '}
                    {t('subuserpopup.delete')}
                  </th>
                  <th>
                    {' '}
                    {t('subuserpopup.label18')}
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>{t('subuserpopup.label5')}</th>
                  <th>
                    <Checkbox
                      value={bookingRead}
                      onChange={(e) => handleBookingRead(e)}
                      checked={bookingRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideWrite}
                      value={bookingWrite}
                      onChange={(e) => handleBookingWrite(e)}
                      checked={bookingWrite}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideDelete}
                      value={bookingDelete}
                      onChange={(e) => handleBookingDelete(e)}
                      checked={bookingDelete}
                    />
                  </th>
                  <th>{t('subuserpopup.label6')}</th>
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
                  <th>
                    {' '}
                    {t('subuserpopup.label7')}
                  </th>
                  <th>
                    <Checkbox
                      value={calendarRead}
                      onChange={(e) => handleCalendarRead(e)}
                      checked={calendarRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideWrite}
                      value={calendarWrite}
                      onChange={(e) => handleCalendarWrite(e)}
                      checked={calendarWrite}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideDelete}
                      value={calendarDelete}
                      onChange={(e) => handleCalendarDelete(e)}
                      checked={calendarDelete}
                    />
                  </th>
                  <th>
                    {' '}
                    {t('subuserpopup.label8')}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    {' '}
                    {t('subuserpopup.label9')}
                  </td>
                  <td>
                    <Checkbox
                      value={propertiesRead}
                      onChange={(e) => handlePropertiesRead(e)}
                      checked={propertiesRead}
                    />
                  </td>
                  <td>
                    <Checkbox
                      disabled={hideWrite}
                      value={propertiesWrite}
                      onChange={(e) => handlePropertiesWrite(e)}
                      checked={propertiesWrite}
                    />
                  </td>
                  <td>
                    <Checkbox
                      disabled={hideDelete}
                      value={propertiesDelete}
                      onChange={(e) => handlePropertiesDelete(e)}
                      checked={propertiesDelete}
                    />
                  </td>
                  <td>
                    {' '}
                    {t('subuserpopup.label10')}
                  </td>
                </tr>

                <tr>
                  <td>
                    {' '}
                    {t('subuserpopup.label11')}
                  </td>
                  <td>
                    <Checkbox
                      value={guestsRead}
                      onChange={(e) => handleGuestsRead(e)}
                      checked={guestsRead}
                    />
                  </td>
                  <td>
                    <Checkbox
                      disabled={hideWrite}
                      value={guestsWrite}
                      onChange={(e) => handleGuestsWrite(e)}
                      checked={guestsWrite}
                    />
                  </td>
                  <td>
                    <Checkbox
                      disabled={hideDelete}
                      value={guestsDelete}
                      onChange={(e) => handleGuestsDelete(e)}
                      checked={guestsDelete}
                    />
                  </td>
                  <td>{t('subuserpopup.label12')}</td>
                </tr>

                <tr>
                  <td>
                    {' '}
                    {t('subuserpopup.label13')}
                  </td>
                  <td>
                    <Checkbox
                      value={teamRead}
                      onClick={(e) => handleTeamRead(e)}
                      checked={teamRead}
                    />
                  </td>
                  <td>
                    <Checkbox
                      disabled={hideWrite}
                      value={teamWrite}
                      onClick={(e) => handleTeamWrite(e)}
                      checked={teamWrite}
                    />
                  </td>
                  <td>
                    <Checkbox
                      disabled={hideDelete}
                      value={teamDelete}
                      onClick={(e) => handleTeamDelete(e)}
                      checked={teamDelete}
                    />
                  </td>
                  <td>
                    {' '}
                    {t('subuserpopup.label14')}
                  </td>
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
                  <th>
                    {' '}
                    {t('subuserpopup.label15')}
                  </th>
                  <th>
                    <Checkbox
                      value={invoicesRead}
                      onChange={(e) => handleInvoicesRead(e)}
                      checked={invoicesRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideWrite}
                      value={invoicesWrite}
                      onChange={(e) => handleInvoicesWrite(e)}
                      checked={invoicesWrite}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideDelete}
                      value={invoicesDelete}
                      onChange={(e) => handleInvoicesDelete(e)}
                      checked={invoicesDelete}
                    />
                  </th>
                  <th>
                    {' '}
                    {t('subuserpopup.label19')}
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
                  <th>
                    {' '}
                    {t('subuserpopup.label20')}
                  </th>
                  <th>
                    <Checkbox
                      value={statsRead}
                      onChange={(e) => handleStatsRead(e)}
                      checked={statsRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideWrite}
                      value={statsWrite}
                      onChange={(e) => handleStatsWrite(e)}
                      checked={statsWrite}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideDelete}
                      value={statsDelete}
                      onChange={(e) => handleStatsDelete(e)}
                      checked={statsDelete}
                    />
                  </th>
                  <th>
                    {' '}
                    {t('subuserpopup.label21')}
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
                  <th>
                    {' '}
                    {t('subuserpopup.label22')}
                  </th>
                  <th>
                    <Checkbox
                      value={serviceRead}
                      onChange={(e) => handleServiceRead(e)}
                      checked={serviceRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideWrite}
                      value={serviceWrite}
                      onChange={(e) => handleServiceWrite(e)}
                      checked={serviceWrite}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideDelete}
                      value={serviceDelete}
                      onChange={(e) => handleServiceDelete(e)}
                      checked={serviceDelete}
                    />
                  </th>
                  <th>{t('subuserpopup.label23')}</th>
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
                      disabled={hideWrite}
                      value={ownerWrite}
                      onChange={(e) => handleOwnerWrite(e)}
                      checked={ownerWrite}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideDelete}
                      value={ownerDelete}
                      onChange={(e) => handleOwnerDelete(e)}
                      checked={ownerDelete}
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
          <div className="custom-table subuser-table border-bottom">
            <table>
              <thead>
                <tr>
                  <th>Billing</th>
                  <th>
                    <Checkbox
                      value={billingRead}
                      onChange={(e) => handleBillingRead(e)}
                      checked={billingRead}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideWrite}
                      value={billingWrite}
                      onChange={(e) => handleBillingWrite(e)}
                      checked={billingWrite}
                    />
                  </th>
                  <th>
                    <Checkbox
                      disabled={hideDelete}
                      value={billingDelete}
                      onChange={(e) => handleBillingDelete(e)}
                      checked={billingDelete}
                    />
                  </th>
                  <th>Billing, Upgrade/downgrade plans</th>
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
          <Col span={24} className="subuser-fields-section">
            <Form.Item>
              <Button style={{ marginRight: 10 }} onClick={close}>
                {t('strings.cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('strings.save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

EditSubUserPopup.propTypes = {
  subUserData: PropTypes.objectOf(PropTypes.object),
  getData: PropTypes.func,
  close: PropTypes.func,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  visible: PropTypes.bool,
};
EditSubUserPopup.defaultProps = {
  subUserData: {},
  getData: () => {},
  close: () => {},
  handleCancel: () => {},
  handleOk: () => {},
  visible: false,
};
export default EditSubUserPopup;
