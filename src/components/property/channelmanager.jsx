import React, { useEffect, useState } from "react";
import "./property.css";
import { Layout, Menu, Button, Tooltip, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Row, Col } from 'antd';
import check from  "../../assets/images/check.png"
import client1 from  "../../assets/images/item-1.jpg"
import client2 from  "../../assets/images/item-2.jpg"
import client3 from  "../../assets/images/item-3.jpg"
import client4 from  "../../assets/images/item-4.jpg"
import client5 from  "../../assets/images/item-5.jpg"
import client6 from  "../../assets/images/item-6.jpg"
import client7 from  "../../assets/images/item-7.jpg"
import client8 from  "../../assets/images/item-8.jpg"
import client9 from  "../../assets/images/item-9.jpg"
import client10 from  "../../assets/images/item-10.jpg"
import client11 from  "../../assets/images/item-11.jpg"
import client12 from  "../../assets/images/item-12.jpg"
import client13 from  "../../assets/images/item-13.jpg"
import client14 from  "../../assets/images/item-14.jpg"
import client15 from  "../../assets/images/item-15.jpg"
import client16 from  "../../assets/images/item-16.jpg"
import client17 from  "../../assets/images/item-17.jpg"
import { Modal } from 'antd';


const ChannelManager = () => {


    const [visible,setVisible]=useState(false)

    const show = () => {
        setVisible(true);
    };


    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };


    return (
        <Wrapper>
            
                <div className="channel-container">

                    <div className="page-header">

                        <h1>Channel Manager</h1>

                    </div>


                    <div className="channel-content">


                        <div className="active-channel">

                            <h3>Activating Channel Manager</h3>
                            <p>In order to connect your property via Channel Manager there are some steps you need to take. This will ensure that the connection is working properly and will eliminate the risk of problems. These steps are explained below. When we activate the connection, all data from Lodgly will be sent to that online reservation channel so it is important to enter all rates and availability, along with all reservations to Lodgly before activating it. Please note that you won't be able to open / close dates in Extranets or change rates directly on connected channels. All updates will be done through Lodgly.</p>

                        </div>



                        <div className="channel-step">

                            <div className="step-box">
                                <img src={check}/>
                                <span>Property</span>
                            </div>

                            <div className="step-box">
                                <img src={check}/>
                                <span>Unit Types</span>
                            </div>

                            <div className="step-box">
                                <img src={check}/>
                                <span>Units</span>
                            </div>

                            <div className="step-box">
                                <img src={check}/>
                                <span>Rates and Availability</span>
                            </div>

                            <div className="step-box">
                                <img src={check}/>
                                <span>Reservations</span>
                            </div>

                        </div>

                        <div className="need-help">
                            <p>Need Help?</p>
                            <p>Click on each step opens a detailed explanation</p>
                            <Button type="primary" onClick={show}>
                            Activating Channel Manager
                            </Button>

                        </div>



                        <div className="active-channel">

                            <h3>Two-way full connection</h3>
                            <p>Two-way connection with online reservations channels like Booking.com, Expedia, Airbnb etc. automatically syncs your rates and availability, as well as reservations. When the connection is active, all new reservations made through those channels will be pulled automatically to Lodgly. From there, Lodgly will update other connected channels and close those periods for sale. Also, all of your direct reservations entered to Lodgly manually will be sent to all connected channels and those dates will be closed. </p>
                                
                            <p>Below is a list of online reservation channels. If you work with one of them already, and want to connect it please do the following: select the "plus icon" and follow instructions from there.</p>

                        </div>





                        <div className="our-client">

                            <Row gutter={[10, 10]}>
                                <Col span={6}>
                                    <img src={client1} />
                                </Col>
                                <Col span={6}>
                                    <img src={client2} />
                                </Col>
                                <Col span={6}>
                                    <img src={client3} />
                                </Col>
                                <Col span={6}>
                                    <img src={client11} />
                                </Col>
                                <Col span={6}>
                                    <img src={client4} />
                                </Col>
                                <Col span={6}>
                                    <img src={client5} />
                                </Col>
                                <Col span={6}>
                                    <img src={client6} />
                                </Col>
                                <Col span={6}>
                                    <img src={client12} />
                                </Col>
                                <Col span={6}>
                                    <img src={client7} />
                                </Col>
                                <Col span={6}>
                                    <img src={client8} />
                                </Col>
                                <Col span={6}>
                                    <img src={client9} />
                                </Col>
                                <Col span={6}>
                                    <img src={client10} />
                                </Col>
                            </Row>

                        </div>

                    





                        <div className="active-channel">

                        <h3>One-way iCal synchronization</h3>
                        <p>One-way sync with online reservation channels like HomeAway, FlipKey, HouseTrip etc. only sends availability from Lodgly to them (open / closed dates), while rates and availability, along with reservations will still be managed directly on those channels. Let’s say you receive a reservation from HomeAway. You will have to enter it to Lodgly; from there Lodgly will close other connected channels. Please note that you will still manage rates manually in extranets of those connected channels. Below is a list of online reservation channels. If you work with one of them already, and want to connect it please do the following: select the “plus icon” and follow instructions from there.</p>

                        </div>




                        <div className="our-client">

                            <Row gutter={[10, 10]}>
                                <Col span={6}>
                                    <img src={client13} />
                                </Col>
                                <Col span={6}>
                                    <img src={client14} />
                                </Col>
                                <Col span={6}>
                                    <img src={client15} />
                                </Col>
                                <Col span={6}>
                                    <img src={client16} />
                                </Col>
                                <Col span={6}>
                                    <img src={client17} />
                                </Col>
                                <Col span={6}>
                                    <img src={client5} />
                                </Col>

                             
                            </Row>

                        </div>
                    

                    </div>

                </div>







                <Modal
                    title="Help"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    wrapClassName="help-modal"
                    
                    >
                


                <div className="modal-body">
                    <h4>Property</h4>
                    <p>Please enter property details - property name, address, telephone number.</p>
                    <p>Unit types and units Online reservation channels that support two-way connection to Rentlio, group accommodation units to unit types. E.g. if your property has two one-bedroom apartments with same rates you need to create one unit type in Rentlio. Name it "one-bedroom apartment" and assign two units, Apartment 1 and Apartment 2. Booking.com, Expedia and various channels have the same methodology. You already understand this if you work with one of them. Please note that you can create unique names for unit types and units in Rentlio, they don’t have to match the names set on online reservation channels.</p>

                    <p>We offer two-way connection with Airbnb, but this channel has some exceptions. When creating a profile on Airbnb you create a Listing that matches one unit in Rentlio. Because of that, connecting Airbnb and Rentlio is done by connecting the Listing to Unit Type. This means that you will have to create one Unit type and add one Unit to it in Rentlio in order to connect it to Airbnb Listing.</p>


                    <h4>Rates and availability</h4>


                    <p>Please enter units and rates in Rentlio - Settings - Units and rates - Edit unit type. Please note that units and rates are set on Unit type level. Before connecting to online reservation channels we advise you to load rates and availability for one year in advance; however 90 days is the minimum in order to activate the connection.</p>

                    <h4>Reservations</h4>
                    <p>Enter all active reservations, except Booking.com reservations* up to today in Rentlio. When you activate the connection, all these periods will be closed automatically on connected online reservation channels. This is a mandatory step in order to avoid overlapped reservations and reopening of closed dates. When the connection is active, everything from Rentlio (rates and availability, reservations) will be sent to the connected online reservation channel.</p>
                    <p>* Booking.com reservations will be imported automatically when we connect your property</p>
                </div>

                

                </Modal>




        </Wrapper>
        
    );
  };
  
  export default ChannelManager;