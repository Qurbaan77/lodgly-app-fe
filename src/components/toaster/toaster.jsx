import React, { useEffect } from 'react';
import './toaster.css';
import { useState } from 'react';

const Toaster = (props) => {

  const close = () => {
    //props.setShow(true);
  };

  return (
    <div className="toster" hidden={props.show}>
      {props.notifyType === 'error' && (
        <div className="error">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onClick={close}>
            Close
          </button>
        </div>
      )}

      {props.notifyType === 'success' && (
        <div className="success" visiblity="hide">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onClick={close}>
            Close
          </button>
        </div>
      )}

      {props.notifyType === 'warning' && (
        <div className="warning">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onChange={close}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Toaster;
