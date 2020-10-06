import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Input, Switch,
} from 'antd';
import {
  InboxOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { propertyInstance } from '../../axios/axiosconfig';

const EditAmenities = ({ handleCancel2, amenitiesList, selectedAmenities }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [nav, setNav] = useState(false);
  const [panel, setPanel] = useState([]);
  const [searchedAmenities, setSearchedAmenities] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleMenu = (e) => {
    if (e === 'open') {
      setNav(true);
    } else if (e === 'close') {
      setNav(false);
    } else if (e === 'toggle') {
      setNav(!nav);
    }
  };

  const handleChange = (e) => {
    setPanel([...panel, e]);
  };

  const onFinish = async (values) => {
    values.amenities = JSON.stringify(panel);
    values.unitTypeV2Id = localStorage.getItem('unitTypeV2Id');
    const response = await propertyInstance.post('/updateAmenities', values);
    if (response.data.code === 200) {
      // getData();
      handleCancel2();
      toast.success('Changes have been saved', {
        containerId: 'B',
        toastId: 'B',
      });
    }
  };

  const isSelected = (id) => {
    const checkExist = selectedAmenities && selectedAmenities.filter((el) => el === id);
    if (checkExist && checkExist.length > 0) {
      return true;
    }
    return undefined;
  };

  function useUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  }

  const update = useUpdate();

  const handleSearch = () => {
    const oldState = [];
    amenitiesList.map((amenities) => {
      if (amenities.name.includes(searchKeyword)) {
        oldState.push(amenities);
      }
      return oldState;
    });
    setSearchedAmenities(oldState);
    update();
  };
  if (searchedAmenities && searchedAmenities.length > 0) {
    return (
      <>
        <h3>EDIT YOUR PROPERTY AMENITIES</h3>
        <p>
          What amenities does this rental offer? Browse through the
          list and check the appropriate amenities for your rental.
        </p>
        <div className="amenities-search">
          <Form.Item>
            <Input
              placeholder="Search"
              onChange={(e) => setSearchKeyword(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Form.Item>
        </div>
        {
          searchedAmenities.filter((v, i, a) => a
            .findIndex((t) => t.name === v.name) === i).map((el) => (
              <div className="property-selection" key={el.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {el.name}
                </div>
                <div className="input-counter">
                  <Switch
                    checked={isSelected(el.id)}
                    onChange={() => handleChange(el.id)}
                  />
                </div>
              </div>
          ))
        }
        {/* searchedAmenities.flter((amenities, i) => (
            <div className="property-selection" key={amenities.id}>
              <div className="icon-name">
                <InboxOutlined />
                {amenities.name}
              </div>
              <div className="input-counter">
                <Switch
                  checked={isSelected(amenities.id)}
                  onChange={() => handleChange(amenities.id)}
                />
              </div>
            </div>
          )) */}
      </>
    );
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <h3>EDIT YOUR PROPERTY AMENITIES</h3>
      <p>
        What amenities does this rental offer? Browse through the
        list and check the appropriate amenities for your rental.
      </p>

      <div className="amenities-search">
        <Form.Item>
          <Input
            placeholder="Search"
            onChange={(e) => setSearchKeyword(e.target.value)}
            onPressEnter={handleSearch}
          />
        </Form.Item>
      </div>

      <div className="edit-room-content">
        <h5>Most common</h5>
        {/* t("amenitiesList.0.name") */}
        {
            amenitiesList.slice(0, 19).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {t(`amenities.${i}.name`)}
                </div>
                <div className="input-counter">
                  <Switch
                    checked={isSelected(amenities.id)}
                    onChange={() => handleChange(amenities.id)}
                  />
                </div>
              </div>
            ))
          }

        <div className={`more-content ${nav ? 'show' : ''}`}>
          <h5>Accessibility</h5>
          {
            amenitiesList.slice(20, 25).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {/* <span>{amenities.name}</span> */}
                  {t(`amenities.${i + 19}.name`)}
                </div>
                <div className="input-counter">
                  <Switch
                    checked={
                      selectedAmenities && selectedAmenities.map((el) => el.id === amenities.id)
                    }
                    onChange={() => handleChange(amenities.id)}
                  />
                </div>
              </div>
            ))
          }
          <h5>Bedroom & Laundry</h5>
          {
            amenitiesList.slice(26, 37).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {/* <span>{amenities.name}</span> */}
                  {t(`amenities.${i + 25}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Cooking</h5>
          {
            amenitiesList.slice(38, 56).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {/* <span>{amenities.name}</span> */}
                  {t(`amenities.${i + 37}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Heating</h5>
          {
            amenitiesList.slice(57, 64).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {/* <span>{amenities.name}</span> */}
                  {t(`amenities.${i + 56}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Multimedia</h5>
          {
            amenitiesList.slice(65, 76).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {t(`amenities.${i + 64}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Other</h5>
          {
            amenitiesList.slice(77, 78).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {t(`amenities.${i + 76}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Outside</h5>
          {
            amenitiesList.slice(79, 98).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {t(`amenities.${i + 78}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Parking</h5>
          {
            amenitiesList.slice(99, 105).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {t(`amenities.${i + 98}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Policies</h5>
          {
            amenitiesList.slice(106, 119).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {t(`amenities.${i + 105}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Safety</h5>
          {
            amenitiesList.slice(120, 128).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {t(`amenities.${i + 119}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
          <h5>Spa</h5>
          {
            amenitiesList.slice(129, 150).map((amenities, i) => (
              <div className="property-selection" key={amenities.id}>
                <div className="icon-name">
                  <InboxOutlined />
                  {t(`amenities.${i + 128}.name`)}
                </div>
                <div className="input-counter">
                  <Switch onChange={() => handleChange(amenities.id)} />
                </div>
              </div>
            ))
          }
        </div>

        <span className="view-more" onClick={() => handleMenu('toggle')} role="presentation">{` ${nav ? 'View less' : 'View more'}`}</span>

      </div>

      <div className="property-btns">
        <Button onClick={handleCancel2} className="border-btn">Back</Button>
        <Button type="primary" htmlType="submit">Save</Button>
      </div>

    </Form>
  );
};
EditAmenities.propTypes = {
  amenitiesList: PropTypes.arrayOf(PropTypes.array),
  handleCancel2: PropTypes.func,
  selectedAmenities: PropTypes.arrayOf(PropTypes.number),
};
EditAmenities.defaultProps = {
  amenitiesList: [],
  handleCancel2: () => {},
  selectedAmenities: [],
};
export default EditAmenities;
