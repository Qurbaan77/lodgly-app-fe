import React from 'react';
import './toaster.css';

const Toaster = (props) => (
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

export default Toaster;
