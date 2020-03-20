import React, { useEffect, useState } from "react";
import "./userprofile.css";
import { Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, } from 'antd';
import { Link } from "react-router-dom";
import user from "../../../assets/images/profile_user.jpg"
import { SettingOutlined } from '@ant-design/icons';


const UserProfile = () => {


    return (
        <div className="user-profile">
            <div className="user-img">
                <img src={user} alt="User"/>
                <SettingOutlined />
            </div>
            <h3>Frederick</h3>
            <span>Admin</span>
        </div>
    );
  };
  
  export default UserProfile;