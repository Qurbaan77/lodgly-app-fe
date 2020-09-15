import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, Row, Col, Form, Select, Input,
} from 'antd';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
import Helmet from 'react-helmet';
import CounterInput from 'react-counter-input';
import { toast } from 'react-toastify';
import favicon from '../../assets/images/logo-mobile.png';
import Wrapper from '../wrapper';
import { propertyInstance, userInstance } from '../../axios/axiosconfig';
import EditAmenities from './EditAmenities';

const Overview = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [noOfGuests, setNoOfGuests] = useState(0);
  const [noOfUnits, setNoOfUnits] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  // const [unitTypeV2Data, setUnitTypeV2Data] = useState({});

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
      unitTypeV2Id: localStorage.getItem('propertyV2Id'),
    });
    if (response.data.code === 200) {
      if (response.data.unitTypeV2Data.length > 0) {
        const data = response.data.unitTypeV2Data[0];
        form.setFieldsValue({
          description: data.description,
          propertyType: data.propertyType,
        });
        if (data.sizeValue > 0) {
          form2.setFieldsValue({
            sqSelectedValue: data.sizeType,
            sqNumber: data.sizeValue,
          });
        }
        setNoOfGuests(data.standardGuests);
        setNoOfUnits(data.units);
        setSelectedAmenities(data.amenities);
      }
    }
  }, [form, form2]);

  useEffect(() => {
    const getAmenities = async () => {
      const res = await userInstance.post('/getAmenities');
      if (res.data.code === 200) {
        setAmenitiesList(res.data.amenities);
      }
    };
    const propertyId = localStorage.getItem('propertyV2Id');
    const getPropertyName = async () => {
      const res = await userInstance.post('/getPropertyName', { propertyId });
      if (res.data.code === 200) {
        const { propertyName: name } = res.data.propertyName[0];
        setPropertyName(name);
        form.setFieldsValue({
          name,
        });
      }
    };
    getPropertyName();
    getAmenities();
    getData();
  }, [form, getData]);

  const { TextArea } = Input;

  const handleRentalTypeSelect = async (value) => {
    if (propertyName && propertyDescription) {
      const propertyId = localStorage.getItem('propertyV2Id');
      const payload = {
        propertyName: propertyName.trim(),
        propertyDescription: propertyDescription.trim(),
        propertyType: value,
        propertyId,
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
    values.unitTypeV2Id = localStorage.getItem('propertyV2Id');
    values.noOfGuests = noOfGuests;
    values.noOfUnits = noOfUnits;
    const response = await propertyInstance.post('/updatePropertyInfo', values);
    if (response.data.code === 200) {
      getData();
      toast.success('Changes have been saved', {
        containerId: 'B',
        toastId: 'B',
      });
    }
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

                  <Row>
                    <Col span={24}>
                      <Form.Item name="name">
                        <Input
                          value={propertyName}
                          onChange={(e) => setPropertyName(e.target.value)}
                          placeholder="Name"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="description">
                        <TextArea
                          placeholder="Description"
                          rows={4}
                          onChange={(e) => setPropertyDescription(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="overview-second-section">
                  <h3>Rental Type</h3>

                  <Row>
                    <Col span={12}>
                      <Form.Item name="propertyType">
                        <Select
                          placeholder="Select"
                          onSelect={handleRentalTypeSelect}
                        >
                          <Select.Option value="Apartment">
                            Apartment
                          </Select.Option>
                          <Select.Option value="Chalet">
                            Chalet
                          </Select.Option>
                          <Select.Option value="Bed and Breakfast">
                            Bed and Breakfast
                          </Select.Option>
                          <Select.Option value="Boat House">
                            Boat House
                          </Select.Option>
                          <Select.Option value="Guest House">
                            Guest House
                          </Select.Option>
                          <Select.Option value="Hotel">Hotel</Select.Option>
                          <Select.Option value="Lodge">
                            Lodge
                          </Select.Option>
                          <Select.Option value="Resort">
                            Resort
                          </Select.Option>
                          <Select.Option value="Villa">Villa</Select.Option>
                          <Select.Option value="Castle">Castle</Select.Option>
                          <Select.Option value="Aparthotel">Aparthotel</Select.Option>
                          <Select.Option value="Camping">Camping</Select.Option>
                          <Select.Option value="Cottage">
                            Cottage
                          </Select.Option>
                          <Select.Option value="House">House</Select.Option>
                          {/* <Select.Option value="Inn">Inn</Select.Option>
                          <Select.Option value="Hostel">Hostel</Select.Option>
                          <Select.Option value="Motel">Motel</Select.Option>
                          <Select.Option value="Hospital">
                            Hospital
                          </Select.Option>
                          <Select.Option value="Pousada">Pousada</Select.Option> */}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="overview-third-section">
                  <Form form={form2} onFinish={onFinishPropertyInfo}>
                    <h3>Property Info</h3>

                    <p>Add key facts about your place</p>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          className="property-info-unit"
                          name="sqSelectedValue"
                          label="What's the size of your property?"
                        >
                          <Select placeholder="SQ FT">
                            <Select.Option value="SQ FT">SQ FT</Select.Option>
                            <Select.Option value="SQ MT">SQ MT</Select.Option>
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

                        <Form.Item label="How many guests can your place accommodate?">
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
                          label="How many units of this rental do you have?"
                        >
                          <div className="input-counter">
                            <CounterInput
                              min={0}
                              max={10}
                              count={noOfUnits}
                              onCountChange={(count) => setNoOfUnits(count)}
                            />
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <div>
                      <Button type="primary" htmlType="submit" disabled={!(noOfUnits > 0 && noOfGuests > 0)}>
                        Save
                      </Button>
                    </div>
                  </Form>
                </div>

                <div className="overview-fourth-section">
                  <h3>Sleeping arrangements</h3>
                  <p>Show guests what the sleeping arrangements are.</p>
                  <Button onClick={() => showEditSleeping()}>
                    Edit sleeping arrangements
                  </Button>
                </div>

                <div className="overview-fifth-section">
                  <h3>Room</h3>
                  <p>
                    What
                    <span>&apos;</span>
                    s the distribution of your rental
                    <span>&apos;</span>
                    s other rooms?
                  </p>
                  <Button onClick={() => show1()}>Edit rooms</Button>
                </div>

                <div className="overview-sixth-section">
                  <h3>Rental amenities</h3>
                  <p>What amenities does your rental offer?</p>
                  <Button onClick={() => show2()}>Edit amenities</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        title="Edit sleeping arrangements"
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
        title="Edit rooms"
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
        title="Edit your property Amenities"
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

  const getData = async () => {
    const response = await propertyInstance.post('/fetchUnittypeData', {
      unitTypeV2Id: localStorage.getItem('propertyV2Id'),
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
    values.unitTypeV2Id = localStorage.getItem('propertyV2Id');
    values.sleepingArrangement = JSON.stringify(obj);
    const response = await propertyInstance.post('/updateSleepingArrangement', values);
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
      <h3>EDIT SLEEPING ARRANGEMENTS</h3>
      <p>Let your guests know what the sleeping arrangements are.</p>

      <div className="property-selection">
        <div className="icon-name">
          <InboxOutlined />
          <span>Baby crib</span>
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
          <span>Child bed</span>
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
          <span>Double bed</span>
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
          <span>Fold-away bed</span>
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
          <span>King-size bed</span>
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
          <span>Loft bed</span>
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
          <span>Queen-size bed</span>
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
          <span>Sofa bed</span>
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
          <span>Single bed</span>
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
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Save
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

  const getData = async () => {
    const response = await propertyInstance.post('/fetchUnittypeData', {
      unitTypeV2Id: localStorage.getItem('propertyV2Id'),
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
    values.unitTypeV2Id = localStorage.getItem('propertyV2Id');
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
      <h3>EDIT ROOMS</h3>
      <p>
        What other rooms does your property have? Whichever rooms you choose
        here will be shown on your website.
      </p>

      <div className="edit-room-content">
        <h5>Private</h5>
        <div className="property-selection">
          <div className="icon-name">
            <InboxOutlined />
            <span>Balcony (private)</span>
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
            <span>Bathroom (private)</span>
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
            <span>Bedroom (private)</span>
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
            <span>Dining room (private)</span>
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
            <span>Kitchen (private)</span>
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
            <span>Living room (private)</span>
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
            <span>Playroom (private)</span>
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
            <span>Terrace (private)</span>
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
            <span>Toilet (private)</span>
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
            <span>Workroom (private)</span>
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
          <h5>Shared</h5>

          <div className="property-selection">
            <div className="icon-name">
              <InboxOutlined />
              <span>Balcony (shared)</span>
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
              <span>Bathroom (shared)</span>
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
              <span>Bedroom (shared)</span>
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
              <span>Dining room (shared)</span>
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
              <span>Kitchen (shared)</span>
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
              <span>Living room (shared)</span>
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
              <span>Playroom (shared)</span>
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
              <span>Terrace (shared)</span>
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
              <span>Toilet (shared)</span>
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
              <span>Workroom (shared)</span>
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
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Save
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
