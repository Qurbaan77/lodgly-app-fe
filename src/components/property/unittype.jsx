import React, { useEffect, useState } from "react";
import "./property.css";
import { Form, Select, Input, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,DeleteOutlined, FormOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import DeletePopup from "./deletepopup";





const UnitType = () => {

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
            
                <div className="unit-type">

                    <div className="page-header">

                        <h1><HomeOutlined /> Unit Type</h1>

                        <Button type="primary" icon={<PlusOutlined />}>
                            <a >Add Unit Type</a>
                        </Button>


                    </div>
 


                    
                    <div className="panel-container">

                      <div className="panel-box units">
                        <div className="group-name">
                            <h4>Unit Type</h4>
                            <span>1 unit are assigned</span>
                        </div>
                        <div className="group-action">
                        <FormOutlined />
                        <DeleteOutlined  onClick={show} />
                        </div>
                      </div>


                      <div className="panel-box units">
                        <div className="group-name">
                            <h4>Unit Type</h4>
                            <span>1 unit are assigned</span>
                        </div>
                        <div className="group-action">
                        <FormOutlined />
                        <DeleteOutlined  onClick={show} />
                        </div>
                      </div>



                      <div className="panel-box units">
                        <div className="group-name">
                            <h4>Unit Type</h4>
                            <span>1 unit are assigned</span>
                        </div>
                        <div className="group-action">
                        <FormOutlined />
                        <DeleteOutlined  onClick={show} />
                        </div>
                      </div>



                      <div className="panel-box units">
                        <div className="group-name">
                            <h4>Unit Type</h4>
                            <span>1 unit are assigned</span>
                        </div>
                        <div className="group-action">
                        <FormOutlined />
                        <DeleteOutlined  onClick={show} />
                        </div>
                      </div>



                      <div className="panel-box units">
                        <div className="group-name">
                            <h4>Unit Type</h4>
                            <span>1 unit are assigned</span>
                        </div>
                        <div className="group-action">
                        <FormOutlined />
                        <DeleteOutlined  onClick={show} />
                        </div>
                      </div>





                    </div>

                </div>


                <Modal visible={visible} onOk={handleOk} onCancel={handleCancel} wrapClassName="delete-modal">
                    <DeletePopup />
                </Modal>


        </Wrapper>
        
    );
  };
  
  export default UnitType;