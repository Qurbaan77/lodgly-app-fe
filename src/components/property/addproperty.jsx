import React, { useEffect, useState } from "react";
import "./property.css";
import { Layout, Menu, Button, Tooltip, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import property1 from "../../assets/images/property-1.png"
import property2 from "../../assets/images/property-2.png"
import property3 from "../../assets/images/property-3.png"
import { Row, Col } from 'antd';



const AddProperty = () => {




    return (
        <Wrapper>
            
                <div className="add-property">

                    <div className="page-header">

                        <h1>All Properties</h1>

                        <Button type="primary" icon={<PlusOutlined />}>
                        Add Property
                        </Button>


                    </div>


                    <div className="property-list">

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div className="property">
                                <img src={property1} />
                                <div className="property-info">
                                    <h3>Property Name 1</h3>
                                    <span>08 Nov 2019</span>
                                    <ul>
                                        <li><HomeOutlined /> 20 Unit Types</li>
                                        <li><HomeOutlined /> 200 Unit</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="property">
                                <img src={property2} />
                                <div className="property-info">
                                    <h3>Property Name 2</h3>
                                    <span>08 Nov 2019</span>
                                    <ul>
                                        <li><HomeOutlined /> 20 Unit Types</li>
                                        <li><HomeOutlined /> 200 Unit</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="property">
                                <img src={property3} />
                                <div className="property-info">
                                    <h3>Property Name 3</h3>
                                    <span>08 Nov 2019</span>
                                    <ul>
                                        <li><HomeOutlined /> 20 Unit Types</li>
                                        <li><HomeOutlined /> 200 Unit</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        <Col className="gutter-row" span={6}>
                            <div className="property">
                                <img src={property1} />
                                <div className="property-info">
                                    <h3>Property Name 3</h3>
                                    <span>08 Nov 2019</span>
                                    <ul>
                                        <li><HomeOutlined /> 20 Unit Types</li>
                                        <li><HomeOutlined /> 200 Unit</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                    </Row>



                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div className="property">
                                <img src={property1} />
                                <div className="property-info">
                                    <h3>Property Name 1</h3>
                                    <span>08 Nov 2019</span>
                                    <ul>
                                        <li><HomeOutlined /> 20 Unit Types</li>
                                        <li><HomeOutlined /> 200 Unit</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="property">
                                <img src={property2} />
                                <div className="property-info">
                                    <h3>Property Name 2</h3>
                                    <span>08 Nov 2019</span>
                                    <ul>
                                        <li><HomeOutlined /> 20 Unit Types</li>
                                        <li><HomeOutlined /> 200 Unit</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="property">
                                <img src={property3} />
                                <div className="property-info">
                                    <h3>Property Name 3</h3>
                                    <span>08 Nov 2019</span>
                                    <ul>
                                        <li><HomeOutlined /> 20 Unit Types</li>
                                        <li><HomeOutlined /> 200 Unit</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        <Col className="gutter-row" span={6}>
                            <div className="property">
                                <img src={property1} />
                                <div className="property-info">
                                    <h3>Property Name 3</h3>
                                    <span>08 Nov 2019</span>
                                    <ul>
                                        <li><HomeOutlined /> 20 Unit Types</li>
                                        <li><HomeOutlined /> 200 Unit</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                    </Row>

                    </div>

                </div>


        </Wrapper>
        
    );
  };
  
  export default AddProperty;