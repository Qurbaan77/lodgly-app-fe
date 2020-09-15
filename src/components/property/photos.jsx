import React, { useState, useEffect } from 'react';
import {
  Row, Col, Form, Upload, Button,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import Wrapper from '../wrapper';
import { propertyInstance } from '../../axios/axiosconfig';
import favicon from '../../assets/images/logo-mobile.png';
import { server } from '../../config/keys';

const Photos = () => {
  const unitTypeV2Id = localStorage.getItem('propertyV2Id');
  const organizationid = localStorage.getItem('organizationid');
  const [propertyImage, setPropertyImage] = useState('');
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const getData = async () => {
    const response = await propertyInstance.post('/fetchUnittypeData', {
      unitTypeV2Id: localStorage.getItem('propertyV2Id'),
    });
    if (response.data.code === 200) {
      if (response.data.unitTypeV2Data.length > 0) {
        const data = response.data.unitTypeV2Data[0];
        setPropertyImage(data.image);
      }
    }
  };

  const props = {
    name: 'file',
    multiple: false,
    // action: `http://localhost:3001/users/propertyPicture/${id}`,
    // action: `${server}/users/propertyPicture/${id}`,
    action: `${server}/properties/propertyPicture?unitTypeV2Id=${unitTypeV2Id}&organizationid=${organizationid}`,
    onChange(info) {
      if (info.file.status === 'done') {
        getData();
        toast.success(`${info.file.name} file uploaded successfully`, {
          containerId: 'B',
        });
      } else if (info.file.status === 'error') {
        toast.error(`${info.file.name} file upload failed.`, {
          containerId: 'B',
        });
      }
    },
  };

  useEffect(() => {
    getData();
  }, []);

  const removePhoto = async () => {
    const res = await propertyInstance.post('/removePropertyPhoto', { unitTypeV2Id: localStorage.getItem('propertyV2Id') });
    if (res.data.code === 200) {
      getData();
      toast.success('photo removed successfully', { containerId: 'B' });
    } else {
      toast.error('server error', { containerId: 'B' });
    }
  };

  return (
    <Wrapper propertyImage={propertyImage}>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="photos-page-view" />
      </Helmet>

      <div className="photos">
        <Row>
          <Col span={24}>
            <div className="photos-content">
              <Form>
                <div className="location-first-section">
                  <h3>Photos</h3>
                  <p>
                    Catch a potential guest
                    <span>&apos;</span>
                    s eye with high-quality photos. Include a
                    variety of perspectives (interior and exterior) to give them
                    the best overall impression of your place.
                  </p>
                  <Form.Item>
                    <Form.Item
                      name="dragger"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                    >
                      <Upload.Dragger {...props}>
                        {
                          propertyImage
                            ? (
                              <>
                                <div className="user-pic-success">
                                  <img src={propertyImage} alt="propertyImage" />
                                </div>
                              </>
                            )
                            : (
                              <>
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                  Support for a single or bulk upload.
                                </p>
                              </>
                            )
                      }
                      </Upload.Dragger>
                      {
                        propertyImage
                        && (
                        <div className="remove-property-btn">
                          <Button onClick={removePhoto}>Remove photo</Button>
                        </div>
                        )
                      }
                    </Form.Item>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
};

export default Photos;
