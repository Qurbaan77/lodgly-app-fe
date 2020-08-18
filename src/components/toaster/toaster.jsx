import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import './toaster.css';

const Toaster = ({
  show, notifyType, notifyMsg, close,
}) => (
  <div className="toster" hidden={show}>
    {notifyType === 'error' && (
      <div className="error">
        <p>{notifyMsg}</p>
        <button className="close-btn" onClick={close} type="button">
          <CloseOutlined />
        </button>
      </div>
    )}

    {notifyType === 'success' && (
      <div className="success" visiblity="hide">
        <p>{notifyMsg}</p>
        <button className="close-btn" onClick={close} type="button">
          <CloseOutlined />
        </button>
      </div>
    )}

    {notifyType === 'warning' && (
      <div className="warning">
        <p>{notifyMsg}</p>
        <button className="close-btn" onChange={close} type="button">
          <CloseOutlined />
        </button>
      </div>
    )}
  </div>
);

Toaster.propTypes = {
  show: PropTypes.func,
  notifyType: PropTypes.string,
  notifyMsg: PropTypes.string,
  close: PropTypes.func,
};
Toaster.defaultProps = {
  show: () => {},
  notifyType: '',
  notifyMsg: '',
  close: () => {},
};
export default Toaster;
