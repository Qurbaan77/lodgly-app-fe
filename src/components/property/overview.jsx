import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, Row, Col, Form, Select, Input,
} from 'antd';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
import Helmet from 'react-helmet';
import CounterInput from 'react-counter-input';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import favicon from '../../assets/images/logo-mobile.png';
import Wrapper from '../wrapper';
import { propertyInstance, userInstance } from '../../axios/axiosconfig';
import EditAmenities from './EditAmenities';

import languageAvailable from '../../config/language';
import translate from '../../config/translation';

const Overview = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [noOfBedRooms, setNoOfBedRooms] = useState(0);
  const [noOfGuests, setNoOfGuests] = useState(0);
  const [noOfUnits, setNoOfUnits] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [languageAction, setLanguageAction] = useState('');
  const [languageSelection, setLanguageSelection] = useState({});
  const [languageList, setLanguageList] = useState([]);
  const [languageToFilter, setLanguageToFilter] = useState('');
  const [languageSelected, setLanguageSelected] = useState('');
  const [transateLanguage, setTranslateLanguage] = useState([]);

  const refSelect = useRef(null);
  const [unitsArr, setUnitsArr] = useState([]);
  // const [unitTypeV2Data, setUnitTypeV2Data] = useState({});
  const { t } = useTranslation();
  const showEditSleeping = () => {
    setVisible(true);
  };

  const show1 = () => {
    setVisible1(true);
  };

  const show2 = () => {
    setVisible2(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCancel1 = () => {
    setVisible1(false);
  };

  const handleCancel2 = () => {
    setVisible2(false);
  };

  const handleFinish = async () => {
    // console.log(values);
  };

  const getData = useCallback(async () => {
    const response = await propertyInstance.post('/fetchUnittypeData', {
      unitTypeV2Id: localStorage.getItem('unitTypeV2Id'),
    });
    if (response.data.code === 200 && response.status !== 204) {
      const data = response.data.unitTypeV2Data[0];
      if (data && data.unitsData) {
        data.unitsData.forEach((el, i) => {
          form2.setFieldsValue({
            [`unit${i + 1}`]: el,
          });
        });
      }
      if (data.propertyType !== null) {
        form.setFieldsValue({
          propertyType: data.propertyType,
        });
      }
      if (data.sizeValue > 0) {
        form2.setFieldsValue({
          sqSelectedValue: data.sizeType,
          sqNumber: data.sizeValue,
        });
      }
      setNoOfBedRooms(data.bedRooms);
      setNoOfGuests(data.standardGuests);
      setNoOfUnits(data.units);
      setSelectedAmenities(data.amenities);
    }
  }, [form, form2]);

  useEffect(() => {
    const getAmenities = async () => {
      const res = await userInstance.post('/getAmenities');
      if (res.data.code === 200) {
        setAmenitiesList(res.data.amenities);
      }
    };
    const propertyId = localStorage.getItem('unitTypeV2Id');
    const getPropertyName = async () => {
      const response = await propertyInstance.get(
        `/fetchTranslated/en/${propertyId}`,
      );
      if (response.status === 200) {
        const { filteredName, filteredDescription } = response.data;
        const name = typeof filteredName !== 'undefined' && filteredName.length > 0
          ? filteredName[0].name
          : '';
        const description = typeof filteredDescription !== 'undefined'
          && filteredDescription.length > 0
          ? filteredDescription[0].description
          : '';
        if (name && description) {
          setPropertyName(name);
          setPropertyDescription(description);
          form.setFieldsValue({
            name,
            description,
          });
        }
      }
    };
    getPropertyName();
    getAmenities();
    getData();
  }, [form, getData]);

  useEffect(() => {
    getLanguages();
  }, []);

  const { TextArea } = Input;
  const handleRentalTypeSelect = async (value) => {
    if (propertyName && propertyDescription) {
      const propertyId = localStorage.getItem('unitTypeV2Id');
      const engPropertyName = await translate(propertyName, 'en');
      const payload = {
        propertyName: engPropertyName.trim(),
        propertyDescription: propertyDescription.trim(),
        propertyType: value,
        propertyId,
        languageSelected,
      };
      await propertyInstance.post('/updateUnitTypeoverview', payload);
    } else {
      if (!propertyName) {
        toast.error('Property name can not be empty', {
          containerId: 'B',
          toastId: 'B',
        });
      }
      toast.error('Please enter property description', {
        containerId: 'B',
        toastId: 'B',
      });
    }
  };

  const onFinishPropertyInfo = async (values) => {
    const units = [];
    unitsArr.forEach((i) => {
      const j = i + 1;
      const unitName = 'unit';
      units.push(values[unitName + j] || `Unit ${j}`);
    });
    values.unitTypeV2Id = localStorage.getItem('unitTypeV2Id');
    values.noOfBedRooms = noOfBedRooms;
    values.noOfGuests = noOfGuests;
    values.noOfUnits = noOfUnits;
    values.unitsData = JSON.stringify(units);
    const response = await propertyInstance.post('/updatePropertyInfo', values);
    if (response.data.code === 200) {
      getData();
      toast.success('Changes have been saved', {
        containerId: 'B',
        toastId: 'B',
      });
    }
  };

  const handleAddLanguage = async () => {
    const propertyId = localStorage.getItem('unitTypeV2Id');
    const language = languageSelection;
    const res = await propertyInstance.post('/addLanguage', {
      propertyId,
      language,
    });
    if (res.status === 200) {
      getLanguages();
      toast.success(res.data.msg, {
        containerId: 'B',
        toastId: 'B',
      });
      setLanguageSelection([]);
    } else {
      toast.success(res.data.msg, {
        containerId: 'B',
        toastId: 'B',
      });
    }
    setShowAdd(false);
  };

  const getLanguages = async () => {
    const propertyId = localStorage.getItem('unitTypeV2Id');
    const res = await propertyInstance.get(`/languages/${propertyId}`);
    if (res.status === 200) {
      setLanguageList([res.data.language]);
    }
  };

  const handleRemoveLanguage = async () => {
    const propertyId = localStorage.getItem('unitTypeV2Id');
    const language = languageSelection;
    const res = await propertyInstance.post('/removeLanguage', {
      propertyId,
      language,
      filterLang: languageToFilter,
    });
    if (res.status === 200) {
      getLanguages();
      toast.success(res.data.msg, {
        containerId: 'B',
        toastId: 'B',
      });
      setLanguageSelection([]);
    } else {
      toast.error(res.data.msg, {
        containerId: 'B',
        toastId: 'B',
      });
    }
    setShowRemove(false);
  };

  const setTranslate = async (e) => {
    setLanguageSelected(e.target.value);
    const filteredLang = languageList[0].filter(
      (el) => Object.keys(el)[0] !== e.target.value,
    );
    setTranslateLanguage(filteredLang);
    const propertyId = localStorage.getItem('unitTypeV2Id');
    const response = await propertyInstance.get(
      `/fetchTranslated/${e.target.value}/${propertyId}`,
    );
    if (response) {
      const {
        data: { filteredDescription, filteredName },
      } = response;
      const name = filteredName.length > 0 ? filteredName[0].name : '';
      const description = filteredDescription.length > 0
        ? filteredDescription[0].description
        : '';
      setPropertyDescription(description);
      setPropertyName(name);
      form.setFieldsValue({
        name,
        description,
      });
    }
  };

  const handleTranslation = async () => {
    if (propertyName && propertyDescription) {
      const translatedName = await translate(propertyName, languageSelected);
      const translatedDescription = await translate(
        propertyDescription,
        languageSelected,
      );
      const nameObject = { lang: languageSelected, name: translatedName };
      const descriptionObject = {
        lang: languageSelected,
        description: translatedDescription,
      };
      const propertyId = localStorage.getItem('unitTypeV2Id');
      const payload = { nameObject, descriptionObject, propertyId };
      const {
        status,
        data: { msg, pName, pDescription },
      } = await propertyInstance.post('/saveTranslation', payload);
      if (status === 200) {
        setPropertyDescription(pDescription.description);
        setPropertyName(pName.name);
        form.setFieldsValue({
          name: pName.name,
          description: pDescription.description,
        });
        toast.success(msg, {
          containerId: 'B',
          toastId: 'B',
        });
      } else {
        toast.error(msg, {
          containerId: 'B',
          toastId: 'B',
        });
      }
    } else {
      toast.error('Miissing Property Details', {
        containerId: 'B',
        toastId: 'B',
      });
    }
  };

  const handleReset = ({ current }) => {
    current.selectedIndex = '0';
  };

  useEffect(() => {
    if (languageAction.languageAction === 'add') setShowAdd(true);
    else if (languageAction.languageAction === 'remove') setShowRemove(true);
  }, [languageAction]);

  const createArray = (value) => {
    setNoOfUnits(value);
    setUnitsArr(Array.from(Array(value).keys()));
  };

  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="overview-page-view" />
      </Helmet>

      <div className="overview">
        <Row>
          <Col span={24}>
            <div className="overview-content">
              <Form form={form} onFinish={handleFinish}>
                <div className="overview-first-section">
                  <h3>OverView</h3>

                  <div className="overview-flex">
                    <div className="overview-input">
                      <select
                        onChange={(e) => {
                          setTranslate(e);
                        }}
                      >
                        <option selected disabled>
                          Select Language
                        </option>
                        {languageList[0]
                          && languageList[0].map((el) => (
                            <option value={Object.keys(el)[0]}>
                              {Object.values(el)}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="overview-input">
                      <select
                        name="languageAction"
                        onChange={(e) => {
                          setLanguageAction({
                            ...languageAction,
                            [e.target.name]: e.target.value,
                          });
                          handleReset(refSelect);
                        }}
                        defaultValue={languageAction}
                        ref={refSelect}
                      >
                        <option value="Select" selected>
                          Languages
                        </option>
                        <option value="add">Add Langauge</option>
                        <option value="remove">Remove Langauge</option>
                      </select>
                    </div>

                    <div className="overview-input">
                      <select
                        onChange={(e) => {
                          handleTranslation(e);
                        }}
                      >
                        <option value="Traslate" selected disabled>
                          Translate
                        </option>
                        {transateLanguage
                          && transateLanguage.map((el) => (
                            <option value={Object.keys(el)}>
                              {`${Object.keys(
                                el,
                              )[0].toLocaleUpperCase()}  >  ${languageSelected.toLocaleUpperCase()}`}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <h3>{t('overview.heading1')}</h3>
                  <Row>
                    <Col span={24}>
                      <Form.Item name="name">
                        <Input
                          value={propertyName}
                          onChange={(e) => setPropertyName(e.target.value)}
                          placeholder={t('overview.placeholder1')}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="description">
                        <TextArea
                          value={propertyDescription}
                          placeholder="Description"
                          rows={4}
                          onChange={(e) => setPropertyDescription(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="overview-second-section">
                  <h3>{t('overview.heading2')}</h3>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="propertyType">
                        <Select
                          placeholder={t('overview.placeholder3')}
                          onSelect={handleRentalTypeSelect}
                        >
                          <Select.Option value="Holiday House">
                            {t('overview.option1')}
                          </Select.Option>
                          <Select.Option value="Holiday Apartment">
                            {t('overview.option2')}
                          </Select.Option>
                          <Select.Option value="Bed and Breakfast">
                            {t('overview.option3')}
                          </Select.Option>
                          <Select.Option value="Boat House">
                            {t('overview.option4')}
                          </Select.Option>
                          <Select.Option value="Bungalow">
                            {t('overview.option5')}
                          </Select.Option>
                          <Select.Option value="Cabin">
                            {t('overview.option6')}
                          </Select.Option>
                          <Select.Option value="Agritourism">
                            {t('overview.option7')}
                          </Select.Option>
                          <Select.Option value="Mobile House">
                            {t('overview.option8')}
                          </Select.Option>
                          <Select.Option value="Villa">
                            {t('overview.option9')}
                          </Select.Option>
                          <Select.Option value="Room">
                            {t('overview.option10')}
                          </Select.Option>
                          <Select.Option value="Hotel">
                            {t('overview.option11')}
                          </Select.Option>
                          <Select.Option value="Camping">
                            {t('overview.option12')}
                          </Select.Option>
                          <Select.Option value="Student Housing">
                            {t('overview.option13')}
                          </Select.Option>
                          <Select.Option value="Resort">
                            {t('overview.option14')}
                          </Select.Option>
                          <Select.Option value="Inn">
                            {t('overview.option15')}
                          </Select.Option>
                          <Select.Option value="Hostel">
                            {t('overview.option16')}
                          </Select.Option>
                          <Select.Option value="Motel">
                            {t('overview.option17')}
                          </Select.Option>
                          <Select.Option value="Hospital">
                            {t('overview.option18')}
                          </Select.Option>
                          <Select.Option value="Pousada">
                            {t('overview.option19')}
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="overview-third-section">
                  <Form form={form2} onFinish={onFinishPropertyInfo}>
                    <h3>{t('overview.heading3')}</h3>
                    <p>{t('overview.paragraph1')}</p>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          className="property-info-unit"
                          name="sqSelectedValue"
                          rules={[
                            {
                              required: true,
                              message: 'Please select the type',
                            },
                          ]}
                          label={t('overview.label1')}
                        >
                          <Select placeholder="SQ FT">
                            <Select.Option value="SQ FT">
                              {t('overview.option20')}
                            </Select.Option>
                            <Select.Option value="SQ MT">
                              {t('overview.option21')}
                            </Select.Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          className="property-info-unit"
                          name="sqNumber"
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: 'Please enter the value',
                            },
                          ]}
                        >
                          <Input placeholder="0.00" />
                        </Form.Item>

                        <Form.Item label={t('overview.label4')}>
                          <div className="input-counter">
                            <CounterInput
                              min={0}
                              max={30}
                              count={noOfBedRooms}
                              onCountChange={(count) => setNoOfBedRooms(count)}
                            />
                          </div>
                        </Form.Item>

                        <Form.Item label={t('overview.label2')}>
                          <div className="input-counter">
                            <CounterInput
                              min={0}
                              max={10}
                              count={noOfGuests}
                              onCountChange={(count) => setNoOfGuests(count)}
                            />
                          </div>
                        </Form.Item>

                        <Form.Item
                          // name="units"
                          label={t('overview.label3')}
                        >
                          <div className="input-counter">
                            <CounterInput
                              min={0}
                              max={10}
                              count={noOfUnits}
                              onCountChange={(count) => createArray(count)}
                            />
                          </div>
                        </Form.Item>
                        {unitsArr.map((el) => (
                          <Form.Item
                            className="property-info-unit"
                            label="Units Name"
                            name={`unit${el + 1}`}
                          >
                            <Input placeholder={`Unit ${el + 1}`} />
                          </Form.Item>
                        ))}
                      </Col>
                    </Row>
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!(noOfUnits > 0 && noOfGuests > 0)}
                      >
                        {t('overview.button1')}
                      </Button>
                    </div>
                  </Form>
                </div>

                <div className="overview-fourth-section">
                  <h3>{t('overview.heading4')}</h3>
                  <p>{t('overview.paragraph2')}</p>
                  <Button onClick={() => showEditSleeping()}>
                    {t('overview.button2')}
                  </Button>
                </div>

                <div className="overview-fifth-section">
                  <h3>{t('overview.heading5')}</h3>
                  <p>
                    {t('overview.paragraph3')}
                    <span>&apos;</span>
                    {t('overview.paragraph4')}
                    <span>&apos;</span>
                    {t('overview.paragraph5')}
                  </p>
                  <Button onClick={() => show1()}>
                    {' '}
                    {t('overview.button3')}
                  </Button>
                </div>

                <div className="overview-sixth-section">
                  <h3>{t('overview.heading6')}</h3>
                  <p>{t('overview.paragraph6')}</p>
                  <Button onClick={() => show2()}>
                    {t('overview.button4')}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        title={t('overview.title1')}
        visible={visible}
        onOk={handleCancel}
        onCancel={handleCancel}
        wrapClassName="guest-modal property-popup"
      >
        <Helmet>
          <body className="ant-scrolling-effect" />
        </Helmet>
        <div className="cross-btn">
          <CloseOutlined onClick={handleCancel} />
        </div>
        <SleepingArrangement handleCancel={handleCancel} />
      </Modal>

      <Modal
        title={t('overview.title2')}
        visible={visible1}
        onOk={handleCancel1}
        onCancel={handleCancel1}
        wrapClassName="guest-modal property-popup"
      >
        <Helmet>
          <body className="ant-scrolling-effect" />
        </Helmet>
        <div className="cross-btn">
          <CloseOutlined onClick={handleCancel1} />
        </div>

        <EditRooms handleCancel1={handleCancel1} />
      </Modal>

      <Modal
        title={t('overview.title3')}
        visible={visible2}
        onOk={handleCancel2}
        onCancel={handleCancel2}
        wrapClassName="guest-modal property-popup"
      >
        <Helmet>
          <body className="ant-scrolling-effect" />
        </Helmet>
        <div className="cross-btn">
          <CloseOutlined onClick={handleCancel2} />
        </div>

        <EditAmenities
          amenitiesList={amenitiesList}
          handleCancel2={handleCancel2}
          selectedAmenities={selectedAmenities}
        />
      </Modal>

      <Modal
        title="Add Language"
        visible={showAdd}
        onOk={handleAddLanguage}
        // confirmLoading={confirmLoading}
        onCancel={() => setShowAdd(false)}
      >
        <div className="overview-input">
          <select
            name="languageSelection"
            onChange={(e) => {
              setLanguageSelection({
                [e.target.value]: e.target.selectedOptions[0].text,
              });
            }}
          >
            {languageAvailable
              && languageAvailable.map((lang) => (
                <option value={lang.langCode}>{lang.name}</option>
              ))}
          </select>
        </div>
      </Modal>

      <Modal
        title="Remove Language"
        visible={showRemove}
        onOk={handleRemoveLanguage}
        // confirmLoading={confirmLoading}
        onCancel={() => setShowRemove(false)}
      >
        <div className="overview-input">
          <select
            name="languageSelection"
            onChange={(e) => {
              setLanguageSelection({
                [e.target.value]: e.target.selectedOptions[0].text,
              });
              setLanguageToFilter(e.target.value);
            }}
          >
            {languageList[0]
              && languageList[0].map((el) => (
                <option value={Object.keys(el)[0]}>{Object.values(el)}</option>
              ))}
          </select>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default Overview;

const SleepingArrangement = ({ handleCancel }) => {
  const [form] = Form.useForm();
  const [babyCrib, setBabyCrib] = useState(0);
  const [childBed, setChilBed] = useState(0);
  const [doubleBed, setDoubleBed] = useState(0);
  const [foldAwayBed, setFoldAwayBed] = useState(0);
  const [kingSizeBed, setKingSizeBed] = useState(0);
  const [loftBed, setLoftBed] = useState(0);
  const [queenSizeBed, setQueenSizeBed] = useState(0);
  const [sofaBed, setSofaBed] = useState(0);
  const [singleBed, setSingleBed] = useState(0);
  const { t } = useTranslation();
  const getData = async () => {
    const response = await propertyInstance.post('/fetchUnittypeData', {
      unitTypeV2Id: localStorage.getItem('unitTypeV2Id'),
    });
    if (response.data.code === 200) {
      if (response.data.unitTypeV2Data.length > 0) {
        const data = response.data.unitTypeV2Data[0];
        if (data.sleepingArrangement !== null) {
          setBabyCrib(data.sleepingArrangement.babyCrib);
          setChilBed(data.sleepingArrangement.childBed);
          setDoubleBed(data.sleepingArrangement.doubleBed);
          setFoldAwayBed(data.sleepingArrangement.foldAwayBed);
          setKingSizeBed(data.sleepingArrangement.kingSizeBed);
          setLoftBed(data.sleepingArrangement.loftBed);
          setQueenSizeBed(data.sleepingArrangement.queenSizeBed);
          setSofaBed(data.sleepingArrangement.sofaBed);
          setSingleBed(data.sleepingArrangement.singleBed);
        }
      }
    }
  };

  const onFinishSleeping = async (values) => {
    const obj = {
      babyCrib,
      childBed,
      doubleBed,
      foldAwayBed,
      kingSizeBed,
      loftBed,
      queenSizeBed,
      sofaBed,
      singleBed,
    };
    values.unitTypeV2Id = localStorage.getItem('unitTypeV2Id');
    values.sleepingArrangement = JSON.stringify(obj);
    const response = await propertyInstance.post(
      '/updateSleepingArrangement',
      values,
    );
    if (response.data.code === 200) {
      getData();
      handleCancel();
      toast.success('Changes have been saved', {
        containerId: 'B',
        toastId: 'B',
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Form form={form} onFinish={onFinishSleeping}>
      <h3>{t('overview.heading7')}</h3>
      <p>{t('overview.paragraph7')}</p>
      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span1')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={babyCrib}
            onCountChange={(count) => setBabyCrib(count)}
          />
        </div>
      </div>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span2')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={childBed}
            onCountChange={(count) => setChilBed(count)}
          />
        </div>
      </div>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span3')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={doubleBed}
            onCountChange={(count) => setDoubleBed(count)}
          />
        </div>
      </div>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span4')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={foldAwayBed}
            onCountChange={(count) => setFoldAwayBed(count)}
          />
        </div>
      </div>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span5')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={kingSizeBed}
            onCountChange={(count) => setKingSizeBed(count)}
          />
        </div>
      </div>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span6')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={loftBed}
            onCountChange={(count) => setLoftBed(count)}
          />
        </div>
      </div>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span7')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={queenSizeBed}
            onCountChange={(count) => setQueenSizeBed(count)}
          />
        </div>
      </div>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span8')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={sofaBed}
            onCountChange={(count) => setSofaBed(count)}
          />
        </div>
      </div>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>{t('overview.span9')}</span>
        </div>
        <div className="input-counter">
          <CounterInput
            min={0}
            max={10}
            count={singleBed}
            onCountChange={(count) => setSingleBed(count)}
          />
        </div>
      </div>

      <div className="property-btns">
        <Button onClick={handleCancel} className="border-btn">
          {t('overview.button5')}
        </Button>
        <Button type="primary" htmlType="submit">
          {t('overview.button6')}
        </Button>
      </div>
    </Form>
  );
};

SleepingArrangement.propTypes = {
  handleCancel: PropTypes.func,
};
SleepingArrangement.defaultProps = {
  handleCancel: () => {},
};

const EditRooms = ({ handleCancel1 }) => {
  const [form] = Form.useForm();
  const [nav, setNav] = useState(false);
  const handleMenu = (e) => {
    if (e === 'open') {
      setNav(true);
    } else if (e === 'close') {
      setNav(false);
    } else if (e === 'toggle') {
      setNav(!nav);
    }
  };

  const [balconyPrivate, setBalconyPrivate] = useState(0);
  const [bathroomPrivate, setBathroomPrivate] = useState(0);
  const [bedroomPrivate, setBedroomPrivate] = useState(0);
  const [diningroomPrivate, setDiningroomPrivate] = useState(0);
  const [kitchenPrivate, setKitchenPrivate] = useState(0);
  const [livingroomPrivate, setLivingroomPrivate] = useState(0);
  const [playroomPrivate, setPlayroomPrivate] = useState(0);
  const [terracePrivate, setTerracePrivate] = useState(0);
  const [toiletPrivate, setToiletPrivate] = useState(0);
  const [workroomPrivate, setWorkroomPrivate] = useState(0);
  const [balconyShared, setBalconyShared] = useState(0);
  const [bathroomShared, setBathroomShared] = useState(0);
  const [bedroomShared, setBedroomShared] = useState(0);
  const [diningroomShared, setDiningroomShared] = useState(0);
  const [kitchenShared, setKitchenShared] = useState(0);
  const [livingroomShared, setLivingroomShared] = useState(0);
  const [playroomShared, setPlayroomShared] = useState(0);
  const [terraceShared, setTerraceShared] = useState(0);
  const [toiletShared, setToiletShared] = useState(0);
  const [workroomShared, setWorkroomShared] = useState(0);
  const { t } = useTranslation();
  const getData = async () => {
    const response = await propertyInstance.post('/fetchUnittypeData', {
      unitTypeV2Id: localStorage.getItem('unitTypeV2Id'),
    });
    if (response.data.code === 200) {
      const data = response.data.unitTypeV2Data[0];
      if (data.rooms !== null) {
        setBalconyPrivate(data.rooms.balconyPrivate);
        setBathroomPrivate(data.rooms.bathroomPrivate);
        setBedroomPrivate(data.rooms.bedroomPrivate);
        setDiningroomPrivate(data.rooms.diningroomPrivate);
        setKitchenPrivate(data.rooms.kitchenPrivate);
        setLivingroomPrivate(data.rooms.livingroomPrivate);
        setPlayroomPrivate(data.rooms.playroomPrivate);
        setToiletPrivate(data.rooms.toiletPrivate);
        setWorkroomPrivate(data.rooms.workroomPrivate);
        setBalconyShared(data.rooms.balconyShared);
        setBathroomShared(data.rooms.bathroomShared);
        setBedroomShared(data.rooms.bedroomShared);
        setDiningroomShared(data.rooms.diningroomShared);
        setKitchenShared(data.rooms.kitchenShared);
        setLivingroomShared(data.rooms.livingroomShared);
        setPlayroomShared(data.rooms.playroomShared);
        setToiletShared(data.rooms.toiletShared);
        setWorkroomShared(data.rooms.workroomShared);
      }
    }
  };

  const onFinishEditRoom = async (values) => {
    const obj = {
      balconyPrivate,
      bathroomPrivate,
      bedroomPrivate,
      diningroomPrivate,
      kitchenPrivate,
      livingroomPrivate,
      playroomPrivate,
      terracePrivate,
      toiletPrivate,
      workroomPrivate,

      balconyShared,
      bathroomShared,
      bedroomShared,
      diningroomShared,
      kitchenShared,
      livingroomShared,
      playroomShared,
      terraceShared,
      toiletShared,
      workroomShared,
    };
    values.unitTypeV2Id = localStorage.getItem('unitTypeV2Id');
    values.rooms = JSON.stringify(obj);
    const response = await propertyInstance.post('/updateEditRooms', values);
    if (response.data.code === 200) {
      getData();
      handleCancel1();
      toast.success('Changes have been saved', {
        containerId: 'B',
        toastId: 'B',
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Form form={form} onFinish={onFinishEditRoom}>
      <h3>{t('overview.heading8')}</h3>
      <p>
        What other rooms does your property have? Whichever rooms you choose
        here will be shown on your website.
      </p>

      <div className="edit-room-content">
        <h5>{t('overview.heading9')}</h5>
        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span10')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={balconyPrivate}
              onCountChange={(count) => setBalconyPrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span11')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={bathroomPrivate}
              onCountChange={(count) => setBathroomPrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span12')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={bedroomPrivate}
              onCountChange={(count) => setBedroomPrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span13')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={diningroomPrivate}
              onCountChange={(count) => setDiningroomPrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span14')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={kitchenPrivate}
              onCountChange={(count) => setKitchenPrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span15')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={livingroomPrivate}
              onCountChange={(count) => setLivingroomPrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span16')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={playroomPrivate}
              onCountChange={(count) => setPlayroomPrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span17')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={terracePrivate}
              onCountChange={(count) => setTerracePrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span18')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={toiletPrivate}
              onCountChange={(count) => setToiletPrivate(count)}
            />
          </div>
        </div>

        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>{t('overview.span19')}</span>
          </div>
          <div className="input-counter">
            <CounterInput
              min={0}
              max={10}
              count={workroomPrivate}
              onCountChange={(count) => setWorkroomPrivate(count)}
            />
          </div>
        </div>

        <div className={`more-content ${nav ? 'show' : ''}`}>
          <h5>{t('overview.heading10')}</h5>
          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span20')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={balconyShared}
                onCountChange={(count) => setBalconyShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span21')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={bathroomShared}
                onCountChange={(count) => setBathroomShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span22')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={bedroomShared}
                onCountChange={(count) => setBedroomShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span23')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={diningroomShared}
                onCountChange={(count) => setDiningroomShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span24')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={kitchenShared}
                onCountChange={(count) => setKitchenShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span25')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={livingroomShared}
                onCountChange={(count) => setLivingroomShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span26')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={playroomShared}
                onCountChange={(count) => setPlayroomShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span27')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={terraceShared}
                onCountChange={(count) => setTerraceShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span28')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={toiletShared}
                onCountChange={(count) => setToiletShared(count)}
              />
            </div>
          </div>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>{t('overview.span29')}</span>
            </div>
            <div className="input-counter">
              <CounterInput
                min={0}
                max={10}
                count={workroomShared}
                onCountChange={(count) => setWorkroomShared(count)}
              />
            </div>
          </div>
        </div>

        <span
          className="view-more"
          onClick={() => handleMenu('toggle')}
          role="presentation"
        >
          {` ${nav ? 'View less' : 'View more'}`}
        </span>
      </div>

      <div className="property-btns">
        <Button onClick={handleCancel1} className="border-btn">
          {t('overview.button7')}
        </Button>
        <Button type="primary" htmlType="submit">
          {t('overview.button8')}
        </Button>
      </div>
    </Form>
  );
};

EditRooms.propTypes = {
  handleCancel1: PropTypes.func,
};
EditRooms.defaultProps = {
  handleCancel1: () => {},
};
