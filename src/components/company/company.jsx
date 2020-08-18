import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';
import Logo from '../../assets/images/logo-color.svg';
import './style.css';
import { client } from '../../config/keys';

const Company = () => (
  <div className="login-page">
    <div className="container">
      <Domain />
    </div>
  </div>
);
export default Company;

const Domain = () => {
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [searchData, setSearchData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setSearchData({
      [e.target.name]: e.target.value,
    });
  };

  const { name } = searchData;

  const searchCompany = async (e) => {
    const payload = {
      companyName: name,
    };
    e.preventDefault();
    const response = await userInstance.post('/searchComapany', payload);
    const { code } = response.data;
    if (code === 200) {
      // const url = client.substring(0,12) + `${name}.` + client.substring(12);
      const url = `${client.substring(0, 7)}${name}.${client.substring(7)}`;
      localStorage.setItem('company', name);
      window.location.href = url;
    } else {
      // toast.error("The password and confirmation password do not match", { containerId: "B" })
    }
  };

  const close = () => {
    setNotifyType('');
  };

  useEffect(() => {
    async function fetchData() {
      const values = queryString.parse(window.location.search);
      const forgetHex = values.token;
      if (forgetHex !== undefined) {
        const response = await userInstance.get(`/verify/${forgetHex}`);
        const { msg } = response.data;
        if (response.data.code === 200) {
          setNotifyType('success');
          setNotifyMsg(msg);
        } else {
          setNotifyType('error');
          setNotifyMsg(msg);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
      <div className="login-box">
        <Link to="/">
          <img className="gr-logo" src={Logo} alt="img" />
        </Link>
        <p>Enter your Logdly Domain to login.</p>

        <div className="login-input">
          <input
            type="text"
            id="name"
            name="name"
            required="required"
            placeholder="companydomain"
            className="form-control"
            onChange={handleChange}
          />
          <span>.lodgly.com</span>
        </div>

        <div className="btn-login-box">
          <button type="submit" className="btn-login" onClick={searchCompany}>
            Continue
          </button>
        </div>
      </div>

      <div className="login-footer">
        <ul>
          <li>
            <a href="/terms-and-conditions" target="_blank">
              Terms&nbsp;of&nbsp;Service
            </a>
          </li>
          <li>
            <a href="/privacy" target="_blank">
              Privacy Policy
            </a>
          </li>
        </ul>

        <div className="footer-logo">
          <Link to="/">
            <img className="gr-logo" src={Logo} alt="img" />
          </Link>
        </div>
      </div>
    </>
  );
};
