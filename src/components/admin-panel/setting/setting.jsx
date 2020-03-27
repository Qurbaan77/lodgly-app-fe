import React, { useEffect, useState } from "react";
import "./setting.css";
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import logo from "../../../assets/images/admin-logo.jpg"
import AdminHeader from "../header/header";



const AdminSetting = () => {




    return (

        <div className="admin-setting">

            <div className="admin-setting-container">

               <AdminHeader />


            </div>

        </div>
        
        
    );
  };
  
  export default AdminSetting;