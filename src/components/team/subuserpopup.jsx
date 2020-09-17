import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './team.css';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  Form, Select, Input, Button, Checkbox, Modal, Row, Col,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { userInstance } from '../../axios/axiosconfig';

const SubUserPopup = ({
  visible, handleOk, handleCancel, close, getData,
}) => {
  const { t } = useTranslation();
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
  const [clickedOnRead, setClickedOnRead] = useState(true);

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];

  const handleSelect = (value) => {
    if (value === 'fullaccess') {
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
      }
      // else {
      //   makeEverythingUncheck();
      // }
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
    const response = await userInstance.post('/addTeam', values);
    if (response.data.code === 200) {
      getData();
      close();
      toast.success('Successfully added in team', { containerId: 'B' });
      form.resetFields();
      makeEverythingUncheck();
    } else if (response.data.code === 400) {
      toast.error('Email already exists!', { containerId: 'B' });
    } else {
      toast.error('some error occurred!', { containerId: 'B' });
    }
  };

  const handleCustomCheck = () => {
    form.setFieldsValue({
      role: 'Custom',
    });
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
  const handleTeamDelete = (e) => (e.target.value ? setTeamDelete(false)
    : setTeamDelete(true));
  const handleInvoicesRead = (e) => (e.target.value
    ? setInvoicesRead(false) : setInvoicesRead(true));
  const handleInvoicesWrite = (e) => (e.target.value
    ? setInvoicesWrite(false) : setInvoicesWrite(true));
  const handleInvoicesDelete = (e) => (e.target.value ? setInvoicesDelete(false)
    : setInvoicesDelete(true));
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

  const handleCross = () => {
    close();
  };
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
                <Input placeholder={t('strings.email')} />
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item label={t('subuserpopup.label25')} name="role">
                <Select
                  placeholder={t('subuserpopup.label3')}
                  onSelect={(value) => {
                    handleSelect(value);
                    return clickedOnRead ? setClickedOnRead(false) : setClickedOnRead(true);
                  }}
                >
                  <Select.Option value="read">Read</Select.Option>
                  <Select.Option value="write">Write</Select.Option>
                  <Select.Option value="fullaccess">Full Access</Select.Option>
                  <Select.Option value="custom" hidden>custom</Select.Option>
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
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={bookingWrite}
                      onChange={(e) => handleBookingWrite(e)}
                      checked={bookingWrite}
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={bookingDelete}
                      onChange={(e) => handleBookingDelete(e)}
                      checked={bookingDelete}
                      onClick={handleCustomCheck}
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
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={calendarWrite}
                      onChange={(e) => handleCalendarWrite(e)}
                      checked={calendarWrite}
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={calendarDelete}
                      onChange={(e) => handleCalendarDelete(e)}
                      checked={calendarDelete}
                      onClick={handleCustomCheck}
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
                      onClick={handleCustomCheck}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={propertiesWrite}
                      onChange={(e) => handlePropertiesWrite(e)}
                      checked={propertiesWrite}
                      onClick={handleCustomCheck}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={propertiesDelete}
                      onChange={(e) => handlePropertiesDelete(e)}
                      checked={propertiesDelete}
                      onClick={handleCustomCheck}
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
                      onClick={handleCustomCheck}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={guestsWrite}
                      onChange={(e) => handleGuestsWrite(e)}
                      checked={guestsWrite}
                      onClick={handleCustomCheck}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={guestsDelete}
                      onChange={(e) => handleGuestsDelete(e)}
                      checked={guestsDelete}
                      onClick={handleCustomCheck}
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
                      onChange={(e) => handleTeamRead(e)}
                      checked={teamRead}
                      onClick={handleCustomCheck}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={teamWrite}
                      onChange={(e) => handleTeamWrite(e)}
                      checked={teamWrite}
                      onClick={handleCustomCheck}
                    />
                  </td>
                  <td>
                    <Checkbox
                      value={teamDelete}
                      onChange={(e) => handleTeamDelete(e)}
                      checked={teamDelete}
                      onClick={handleCustomCheck}
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
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={invoicesWrite}
                      onChange={(e) => handleInvoicesWrite(e)}
                      checked={invoicesWrite}
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={invoicesDelete}
                      onChange={(e) => handleInvoicesDelete(e)}
                      checked={invoicesDelete}
                      onClick={handleCustomCheck}
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
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={statsWrite}
                      onChange={(e) => handleStatsWrite(e)}
                      checked={statsWrite}
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={statsDelete}
                      onChange={(e) => handleStatsDelete(e)}
                      checked={statsDelete}
                      onClick={handleCustomCheck}
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
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={serviceWrite}
                      onChange={(e) => handleServiceWrite(e)}
                      checked={serviceWrite}
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={serviceDelete}
                      onChange={(e) => handleServiceDelete(e)}
                      checked={serviceDelete}
                      onClick={handleCustomCheck}
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
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={ownerWrite}
                      onChange={(e) => handleOwnerWrite(e)}
                      checked={ownerWrite}
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={ownerDelete}
                      onChange={(e) => handleOwnerDelete(e)}
                      checked={ownerDelete}
                      onClick={handleCustomCheck}
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
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={billingWrite}
                      onChange={(e) => handleBillingWrite(e)}
                      checked={billingWrite}
                      onClick={handleCustomCheck}
                    />
                  </th>
                  <th>
                    <Checkbox
                      value={billingDelete}
                      onChange={(e) => handleBillingDelete(e)}
                      checked={billingDelete}
                      onClick={handleCustomCheck}
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

SubUserPopup.propTypes = {
  getData: PropTypes.func,
  close: PropTypes.func,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  visible: PropTypes.bool,
};
SubUserPopup.defaultProps = {
  getData: () => {},
  close: () => {},
  handleCancel: () => {},
  handleOk: () => {},
  visible: false,
};
export default SubUserPopup;
