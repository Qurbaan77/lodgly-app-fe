import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './invoice.css';
import {
  Form,
  Select,
  Input,
  Layout,
  Menu,
  Button,
  Radio,
  Slider,
  DatePicker,
  Tooltip,
  Dropdown,
  Checkbox,
  TimePicker,
}

 from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  PartitionOutlined,
  UserOutlined,
  DownOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Modal } from 'antd';
import { Table } from 'antd';
import property_icon from '../../assets/images/menu/property-icon-orange.png';
import { Row, Col } from 'antd';
import { Collapse } from 'antd';
import delete_icon from '../../assets/images/menu/delete-icon-red.png';


const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const AdInvoicePopup = () => {

  const { Option } = Select;

  const { MonthPicker, RangePicker } = DatePicker;


    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }



  return (
   
    <Form name="basic" >


          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <div className="invoice-property-info">
                  <h4><img src={property_icon} /> Property Name 1</h4>
                  <p>City of London, United Kingdom, 4915 St Anthony Ave</p>
              </div>
            </Col>

            <Col span={12}>
               <div className="invoice-owner-info">
                   <p>t: +385 01 123 456</p>
                   <p>owner@gmail.com</p>
                   <p>www.mywebsite.com </p>
                </div>
              
            </Col>

            

          </Row>







          <Row className="invoice-border">
            <Col span={10}>
              <div className="invoice-date">
                  <h4>Invoice 1 - 2019</h4>

                  <Row>
                  <Col span={12} style={{ marginRight: 10 }}>
                  <Form.Item name="date-picker" label="Date">
                    <DatePicker />
                  </Form.Item>
                  </Col>

                  <Col span={9}>
                  <Form.Item name="time-picker" label="Time">
                    <TimePicker />
                  </Form.Item>
                  </Col>
                  </Row>

                  <Row>
                  <Col span={12}>
                  <Form.Item name="date-picker" label="Delivery Date">
                    <DatePicker />
                  </Form.Item>
                  </Col>
                  </Row>


                  <Row>
                  <Col span={12}>
                  <Form.Item name="date-picker" label="Due Date">
                    <DatePicker />
                  </Form.Item>
                  </Col>
                  </Row>


                  <Row>
                  <Col span={18}>
                  <Form.Item name="date-picker" label="Payment Type">
                      <Select placeholder='Select'>
                        <Select.Option value='bank'>BANK NOTES</Select.Option>
                        <Select.Option value='card'>CARD</Select.Option>
                        <Select.Option value='bank'>CHECK</Select.Option>
                        <Select.Option value='card'>BANKTRANSFER</Select.Option>
                      </Select>
                  </Form.Item>
                  </Col>
                  </Row>
                  
              </div>
            </Col>

            <Col span={4}></Col>

            <Col span={10}>
               <div className="client-info">
                   <h4>Client:</h4>

                   <Form.Item label='Full Name' name='fname'>
                        <Input />
                   </Form.Item>

                   <Form.Item label='Email' name='email'>
                        <Input />
                   </Form.Item>

                   <Form.Item label='Address' name='address'>
                        <Input />
                   </Form.Item>

                   <Form.Item label='Vat ID' name='vat'>
                        <Input />
                   </Form.Item>
                  
                </div>
              
            </Col>

            

          </Row>




         
        
          <div className='additional-fields'>

          <Row style={{ alignItems: 'center' }}>
             <Col span={6}>
                <Form.Item label="Item Description">
                    <Input />
                </Form.Item>
              </Col>

              <Col span={2}>
                <Form.Item label="Qty.">
                    <Input placeholder="1,00" />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label="Price">
                    <Input placeholder="0,00 EUR" />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item  label="Amount">
                    <Input placeholder="0,00 EUR" />
                </Form.Item>
              </Col>

              <Col span={2} className="label-hidden">
                <Form.Item  label="Qty.">
                    <Input placeholder="0,00 %" />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item  label="Discount">
                    <Input placeholder="0,00 EUR" />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item  label="Total">
                    <Input placeholder="0,00 EUR" />
                </Form.Item>
              </Col>

              <Col span={2} className="deleteicon">
                <Form.Item>
                   <img src={delete_icon} />
                </Form.Item>
              </Col>

              </Row>

          </div>
     

        



          
        <Row style={{ alignItems: 'center' }}>


        <Col span={12}>

        <div className='additional-add-guest'>
          <PlusOutlined /> Add additional guest
        </div>

          
        </Col>


        <Col span={12}>

        <div className='total-add' >
          <h3>TOTAL: <span>0,00 €</span></h3>
        </div>

          
        </Col>



          <Col span={24} className="m-top-30">
            <Form.Item name='notes1' label="Impression">
                <Input.TextArea />
            </Form.Item>

            <p className="web-info">United Kingdom | 4915 St Anthony Ave | t: +385 01 123 456 | owner@gmail.com | www.mywebsite.com   </p>

          </Col>
        </Row>








         

          <Row style={{ alignItems: 'center', textAlign: 'right', marginTop: '10px', marginBottom: '20px' }}>
            <Col span={24}>
              <Form.Item>
              <Button type="secondry" style={{ marginRight: 10 }}>
                Save Draft
              </Button>
                <Button type="primary" htmlType="submit">
                  Issue
                </Button>
              </Form.Item>
            </Col>
            <Col span={24}>
                <div className="note">
                   <p>NOTE: Issued invoice has an ordinal number assigned to it, and it cannot be changed. Invoice that is saved as draft can be changed afterwards.</p>
                </div>
            </Col>
          </Row>
        </Form>

);
};

export default AdInvoicePopup;
