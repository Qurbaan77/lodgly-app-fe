import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './team.css';
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
  const [billingRead, setBillingRead] = useState(false);
  const [billingWrite, setBillingWrite] = useState(false);

  const updateValues = useCallback(() => {
    form.setFieldsValue({
      email: subUserData.email,
      role: subUserData.role,
    });
    setBookingRead(subUserData.bookingRead);
    setBookingWrite(subUserData.bookingWrite);
    setPropertiesRead(subUserData.propertiesRead);
    setPropertiesWrite(subUserData.propertiesWrite);
    setCalendarRead(subUserData.calendarRead);
    setCalendarWrite(subUserData.calendarWrite);
    setGuestsRead(subUserData.guestsRead);
    setGuestsWrite(subUserData.guestsWrite);
    setTeamRead(subUserData.teamRead);
    setTeamWrite(subUserData.teamWrite);
    setInvoicesRead(subUserData.invoicesRead);
    setInvoicesWrite(subUserData.invoicesWrite);
    setStatsRead(subUserData.statsRead);
    setStatsWrite(subUserData.statsWrite);
    setServiceRead(subUserData.serviceRead);
    setServiceWrite(subUserData.serviceWrite);
    setOwnerRead(subUserData.ownerRead);
    setOwnerWrite(subUserData.ownerWrite);
    setBillingWrite(subUserData.billingWrite);
    setBillingRead(subUserData.billingRead);
  }, [subUserData, form]);

  useEffect(() => {
    updateValues();
  }, [visible, updateValues]);

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
      setBillingRead(true);
      setBillingWrite(true);
    } else {
      setBookingRead(subUserData.bookingRead);
      setBookingWrite(subUserData.bookingWrite);
      setPropertiesRead(subUserData.propertiesRead);
      setPropertiesWrite(subUserData.propertiesWrite);
      setCalendarRead(subUserData.calendarRead);
      setCalendarWrite(subUserData.calendarWrite);
      setGuestsRead(subUserData.guestsRead);
      setGuestsWrite(subUserData.guestsWrite);
      setTeamRead(subUserData.teamRead);
      setTeamWrite(subUserData.teamWrite);
      setInvoicesRead(subUserData.invoicesRead);
      setInvoicesWrite(subUserData.invoicesWrite);
      setStatsRead(subUserData.statsRead);
      setStatsWrite(subUserData.statsWrite);
      setServiceRead(subUserData.serviceRead);
      setServiceWrite(subUserData.serviceWrite);
      setOwnerRead(subUserData.ownerRead);
      setOwnerWrite(subUserData.ownerWrite);
      setBillingRead(subUserData.billingRead);
      setBillingWrite(subUserData.billingWrite);
    }
  };

  const onFinish = async (values) => {
    const copyValues = values;
    copyValues.id = subUserData.id;
    copyValues.bookingRead = bookingRead;
    copyValues.bookingWrite = bookingWrite;
    copyValues.propertiesRead = propertiesRead;
    copyValues.propertiesWrite = propertiesWrite;
    copyValues.calendarRead = calendarRead;
    copyValues.calendarWrite = calendarWrite;
    copyValues.guestsRead = guestsRead;
    copyValues.guestsWrite = guestsWrite;
    copyValues.teamRead = teamRead;
    copyValues.teamWrite = teamWrite;
    copyValues.invoicesRead = invoicesRead;
    copyValues.invoicesWrite = invoicesWrite;
    copyValues.statsRead = statsRead;
    copyValues.statsWrite = statsWrite;
    copyValues.serviceRead = serviceRead;
    copyValues.serviceWrite = serviceWrite;
    copyValues.ownerRead = ownerRead;
    copyValues.ownerWrite = ownerWrite;
    copyValues.affiliateId = subUserData.userId;
    copyValues.billingRead = billingRead;
    copyValues.bookingWrite = billingWrite;
    const companyName = window.location.hostname.split('.');
    copyValues.company = companyName[0];
    const response = await userInstance.post('/updateSubUser', copyValues);
    if (response.status === 200) {
      getData();
      close();
    }
  };
  const handleBookingRead = (e) => (e.target.value ? setBookingRead(false) : setBookingRead(true));
  const handleBookingWrite = (e) => (e.target.value
    ? setBookingWrite(false) : setBookingWrite(true));
  const handlePropertiesRead = (e) => (e.target.value
    ? setPropertiesRead(false) : setPropertiesRead(true));
  const handlePropertiesWrite = (e) => (e.target.value
    ? setPropertiesWrite(false) : setPropertiesWrite(true));
  const handleCalendarRead = (e) => (e.target.value
    ? setCalendarRead(false) : setCalendarRead(true));
  const handleCalendarWrite = (e) => (e.target.value
    ? setCalendarWrite(false) : setCalendarWrite(true));
  const handleGuestsRead = (e) => (e.target.value
    ? setGuestsRead(false) : setGuestsRead(true));
  const handleGuestsWrite = (e) => (e.target.value
    ? setGuestsWrite(false) : setGuestsWrite(true));
  const handleTeamRead = (e) => (e.target.value === 'true'
    ? setTeamRead(false) : setTeamRead(true));
  const handleTeamWrite = (e) => (e.target.value === 'true'
    ? setTeamWrite(false) : setTeamWrite(true));
  const handleInvoicesRead = (e) => (e.target.value
    ? setInvoicesRead(false) : setInvoicesRead(true));
  const handleInvoicesWrite = (e) => (e.target.value
    ? setInvoicesWrite(false) : setInvoicesWrite(true));
  const handleStatsRead = (e) => (e.target.value ? setStatsRead(false) : setStatsRead(true));
  const handleStatsWrite = (e) => (e.target.value ? setStatsWrite(false) : setStatsWrite(true));
  const handleServiceRead = (e) => (e.target.value ? setServiceRead(false) : setServiceRead(true));
  const handleServiceWrite = (e) => (e.target.value
    ? setServiceWrite(false) : setServiceWrite(true));
  const handleOwnerRead = (e) => (e.target.value ? setOwnerRead(false) : setOwnerRead(true));
  const handleOwnerWrite = (e) => (e.target.value ? setOwnerWrite(false) : setOwnerWrite(true));
  const handleBillingRead = (e) => (e.target.value ? setBillingRead(false) : setBillingRead(true));
  const handleBillingWrite = (e) => (e.target.value ? setBillingWrite(false)
    : setBillingWrite(true));

  const handleCross = () => close();

  return (
    <Modal
      title={t('editsubuserpopup.heading1')}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal sub-user"
    >
      <div className="cross-btn">
        <CloseOutlined onClick={handleCross} />
      </div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={8}>
            <Form.Item
              label={t('strings.email')}
              name="email"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  type: 'email',
                  message: t('editsubuserpopup.label2'),
                },
                {
                  required: true,
                  message: t('editsubuserpopup.label3'),
                },
              ]}
            >
              <Input placeholder={t('strings.email')} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label={t('editsubuserpopup.label26')} name="role">
              <Select onSelect={(value) => handleSelect(value)}>
                <Select.Option value="subuser">
                  {t('editsubuserpopup.label4')}
                </Select.Option>
                <Select.Option value="fullaccess">
                  {t('editsubuserpopup.label5')}
                </Select.Option>
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
                  <th>{t('editsubuserpopup.label6')}</th>
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
                  <th>{t('editsubuserpopup.label7')}</th>
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
                  <th>{t('editsubuserpopup.label8')}</th>
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
                  <th>{t('editsubuserpopup.label9')}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{t('editsubuserpopup.label10')}</td>
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
                  <td>{t('editsubuserpopup.label11')}</td>
                </tr>

                <tr>
                  <td>{t('editsubuserpopup.label12')}</td>
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
                  <td>{t('editsubuserpopup.label13')}</td>
                </tr>

                <tr>
                  <td>{t('editsubuserpopup.label14')}</td>
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
                  <td>{t('editsubuserpopup.label15')}</td>
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
                  <th>{t('editsubuserpopup.label16')}</th>
                  <th>{t('editsubuserpopup.label17')}</th>
                  <th>{t('editsubuserpopup.label18')}</th>
                  <th>{t('editsubuserpopup.label9')}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{t('editsubuserpopup.label16')}</td>
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
                  <td>{t('editsubuserpopup.label21')}</td>
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
                  <th>{t('editsubuserpopup.label22')}</th>
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
                  <th>{t('editsubuserpopup.label23')}</th>
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
                  <th>{t('editsubuserpopup.label24')}</th>
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
                  <th>{t('editsubuserpopup.label25')}</th>
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
                  <th>{t('editsubuserpopup.label26')}</th>
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
                  <th>{t('editsubuserpopup.label25')}</th>
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
                      value={billingWrite}
                      onChange={(e) => handleBillingWrite(e)}
                      checked={billingWrite}
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
          <Col span={24}>
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
