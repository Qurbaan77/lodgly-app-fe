import React, { useEffect } from 'react';
import './toaster.css';
import { useState } from 'react';

const Toaster = (props) => {

  return (
    <div className="toster" hidden={props.show}>
      {props.notifyType === 'error' && (
        <div className="error">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onClick={props.close}>
            Close
          </button>
        </div>
      )}

      {props.notifyType === 'success' && (
        <div className="success" visiblity="hide">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onClick={props.close}>
            Close
          </button>
        </div>
      )}

      {props.notifyType === 'warning' && (
        <div className="warning">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onChange={props.close}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Toaster;
