import React from 'react';
import PropTypes from 'prop-types';
import './toaster.css';

const Toaster = ({
  show, notifyType, notifyMsg, close,
}) => (
  <div className="toster" hidden={show}>
    {notifyType === 'error' && (
      <div className="error">
        <p>{notifyMsg}</p>
        <button className="close-btn" onClick={close} type="button">
          Close
        </button>
      </div>
    )}

    {notifyType === 'success' && (
      <div className="success" visiblity="hide">
        <p>{notifyMsg}</p>
        <button className="close-btn" onClick={close} type="button">
          Close
        </button>
      </div>
    )}

    {notifyType === 'warning' && (
      <div className="warning">
        <p>{notifyMsg}</p>
        <button className="close-btn" onChange={close} type="button">
          Close
        </button>
      </div>
    )}
  </div>
);

Toaster.propTypes = {
  show: PropTypes.func.isRequired,
  notifyType: PropTypes.string.isRequired,
  notifyMsg: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Toaster;
