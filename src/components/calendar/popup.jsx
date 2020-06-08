import React, { useEffect, useState } from 'react';
import './calendar.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  DatePicker,
  TimePicker,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PlusSquareOutlined,
  UploadOutlined,
  DeleteOutlined, RedEnvelopeOutlined,ReconciliationOutlined, MailOutlined,
  FormOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Link } from "react-router-dom";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const { Option } = Select;

const { MonthPicker, RangePicker } = DatePicker;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}


const menu = (
  <Menu>
    <Menu.Item key="0">
       <Checkbox onChange={onChange}>Double Room</Checkbox>
    </Menu.Item>
    <Menu.Item key="1">
      <Checkbox onChange={onChange}>Two Bedroom</Checkbox>
    </Menu.Item>
    <Menu.Item key="1">
    <Checkbox onChange={onChange}>One Bedroom</Checkbox>
    </Menu.Item>
      
  </Menu>
);



const Popup = () => {


  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const cancel = () => {
    setVisible(false);
  };


  const [visible1, setVisible1] = useState(false);

  const show1 = () => {
    setVisible1(true);
  };

  const cancel1 = () => {
    setVisible1(false);
  };


  const [visible2, setVisible2] = useState(false);

  const show2 = () => {
    setVisible2(true);
  };

  const cancel2 = () => {
    setVisible2(false);
  };





  return (
    <Wrapper>

       <Button type="primary" icon={<PlusOutlined />}  onClick={show} style={{ marginRight: 20 }}>
           Update Guest
        </Button>


        <Button type="primary" icon={<PlusOutlined />}  onClick={show1} style={{ marginRight: 20 }}>
           Group Reservation
        </Button>



        <Button type="primary" icon={<PlusOutlined />}  onClick={show2} style={{ marginRight: 20 }}>
           Calendar Setting
        </Button>


        <Modal
        title="Guest"
        visible={visible}
        onCancel={cancel}
        wrapClassName="guest-modal"
        >
              <UpdateGuest />

        </Modal>




        <Modal
        title="Add New Group Reservation"
        visible={visible1}
        onCancel={cancel1}
        wrapClassName="create-booking-modal group-reservation"
        >
            <GroupReservation />

        </Modal>




        <Modal
        title="Calendar Setting"
        visible={visible2}
        onCancel={cancel2}
        wrapClassName="create-booking-modal calendar-setting"
        >
            <CalendarSetting />

        </Modal>


      </Wrapper>
  );
};

export default Popup;






const UpdateGuest = () => {
    


  return (

     
        <Form  name="basic">
          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="firstname"
                style={{ paddingRight: 20 }}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Country of Residence" name="lastname">
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="E-mail"
                name="email"
                style={{ paddingRight: 20 }}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Phone" name="phone">
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                style={{ paddingRight: 20 }}
              >
                <DatePicker />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="gender" label="Gender">
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio value={1}>M</Radio>
                  <Radio value={2}>F</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="Type of Document"
                name="document"
                style={{ paddingRight: 20 }}
              >
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Document Number" name="documentnumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="Citizenship"
                name="citizenship"
                style={{ paddingRight: 20 }}
              >
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="PLace of Residence" name="documentnumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={24}>
              <Form.Item label="Notes" name="notes">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center', textAlign: 'right' }}>
            <Col span={24}>
              <Form.Item>
                <Button style={{ marginRight: 10 }} >Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>



  );
};



const GroupReservation = () => {


 return(


  <Form name="basic" >

  <Row style={{ alignItems: "center", padding: "0px 20px" }}>

      <Col span={24}>
          <Form.Item
              label="Reservation Date"
              name="groupname"
              style={{ paddingRight: 20 }}
              >
              <RangePicker />
          </Form.Item>
  </Col>


  <Col span={24}>
  <Radio.Group name="radiogroup" defaultValue={1}>
      <Radio value={1}>Confirmed</Radio>
      <Radio value={2}>Option</Radio>
  </Radio.Group>
  </Col>


  <Col span={24}>
<div className="availability">
  <p>Availability is checked automatically</p>
</div>
  </Col>

  

  </Row>





  <Row style={{ alignItems: "center", padding: "0px 20px" }}>

     

      <Col span={24}>
          <Form.Item className="comision"
          label="Channel, Commission(%)"
          name="channel"
          >
              <Select 
              style={{ width: "70%" , display: "inline-block" }}>
                   <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
              </Select>

              <Input 
               style={{ width: "26%" , display: "inline-block" , verticalAlign: "sub" , marginLeft: "4%" }}
              />
          </Form.Item>
      </Col>

  

  </Row>






  <Row style={{ alignItems: "center", padding: "0px 20px" }}>
  <Col span={24}>

    <div className="reservation-booker">

      <h4>Reservation Booker</h4>

      <Row>
        <Col span={12}>
          <label>Full Name</label>
          <p>Name Name</p>
        </Col>

        <Col span={12}>
        <label>Country</label>
        <p>Germany</p>
      </Col>

      <Col span={12}>
        <label>Email</label>
        <p>test@gmail.com</p>
      </Col>

      <Col span={12}>
        <label>Phone</label>
        <p>+123456789</p>
      </Col>

      </Row>

    </div>

  <div className="add-edit-data">
    <a href=""><FormOutlined /> Edit/Additional Data</a>
  </div>
  </Col>
  </Row>

 


  <Row style={{ alignItems: "center" }}>

      <Col span={24}>
      <Form.Item style={{ marginBottom: "0" }}>

  <Collapse accordion>

  <Panel icon={<PlusSquareOutlined />} header="Add Guest Details (Optional)" key="1">
  {text}
  </Panel>


  </Collapse>
  </Form.Item>
  </Col>
  </Row>




  <Row style={{ alignItems: "center", background: "#fbfbfc", padding: "0px 20px", paddingTop:"20px"}}>

      <Col span={24}>
          <Form.Item style={{textAlign:"center"}}>
              <Button type="primary" htmlType="submit">
                  Save Reservation
              </Button>
          </Form.Item>

      </Col>
  </Row>







  </Form>


 );

};



















const CalendarSetting = () => {
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  return(
 
 
   
    <div className="filter-box">



<Form name="basic" >

    <Row style={{ alignItems: "center" }}>

        <Col span={24}>
            <Form.Item
             
                label="Show on Reservations"
                name="property"
                >
                    <Select style={{ marginBottom: "10px" }}>
                        <Select.Option value="demo">All Property</Select.Option>
                        <Select.Option value="demo">All Property</Select.Option>
                    </Select>

                    <Select>
                        <Select.Option value="demo">All Property</Select.Option>
                        <Select.Option value="demo">All Property</Select.Option>
                    </Select>
            </Form.Item>
        </Col>


        <Col span={24}>
            <Form.Item 
                label="Reservation Color Based On"
                name="status"
                >
                <Select>
                        <Select.Option value="demo">All Property</Select.Option>
                        <Select.Option value="demo">All Property</Select.Option>
                    </Select>
            </Form.Item>
        </Col>



        <Col span={24}>
            <Form.Item>

            <ul className="filter-list">

                <li>
                    <span className="uppercase">Show on Reservation</span>
                    <Switch defaultChecked onChange={onChange} />
                </li>
                </ul>



                <h4>Show/Hide Restrictions</h4>

                <ul className="filter-list" style={{ margin: "0", padding: "0", border: "none" }}>

                    <li>
                        <span>Min Stay</span>
                        <Switch defaultChecked onChange={onChange} />
                    </li>

                    <li>
                        <span>Max Stay</span>
                        <Switch  onChange={onChange} />
                    </li>

                    <li>
                        <span>Min Stay Arrival</span>
                        <Switch  onChange={onChange} />
                    </li>

                    <li>
                        <span>Max Stay Arrival</span>
                        <Switch  onChange={onChange} />
                    </li>

                    <li>
                        <span>No Check in</span>
                        <Switch  onChange={onChange} />
                    </li>

                    <li>
                        <span>No Departure</span>
                        <Switch  onChange={onChange} />
                    </li>

                </ul>

            </Form.Item>
        </Col>


    </Row>

</Form>

</div>


 
 
  );
 
 };
 