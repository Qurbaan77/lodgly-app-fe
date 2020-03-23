import React, { useEffect, useState } from "react";
import "./property.css";
import { Form, Select, Input, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';


const { Panel } = Collapse;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;






const UnitType = () => {




    return (
        <Wrapper>
            
                <div className="unit-type">

                    <div className="page-header">

                        <h1><HomeOutlined /> Unit Type</h1>

                        <Button type="primary" icon={<PlusOutlined />}>
                            <a href="/">Add Unit Type</a>
                        </Button>


                    </div>
 


                    <div className="panel-container">

                    <Collapse defaultActiveKey={['1']} accordion>

                        <Panel header="Unit Type 1" key="1">
                           {text}
                        </Panel>


                        <Panel header="Unit Type 2" key="2">
                            {text}
                        </Panel>



                        <Panel header="Unit Type 3" key="3">
                         {text}
                        </Panel>



                        <Panel header="Unit Type 4" key="4">

                             {text}
                       
                        </Panel>






                    </Collapse>

                    </div>


                </div>


        </Wrapper>
        
    );
  };
  
  export default UnitType;