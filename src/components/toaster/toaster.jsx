import React, { useEffect } from 'react';
import './toaster.css';

const Toaster = (props) => {
  const close = () => {
    console.log('Function Called')
  }
  return (
    <div className="toster">
      {props.notifyType === 'error' && (
        <div className="error">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onClick={close}>Close</button>
        </div>
      )}

      {props.notifyType === 'success' && (
        <div className="success">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onClick={close}>Close</button>
        </div>
      )}

      {props.notifyType === 'warning' && (
        <div className="warning">
          <p>{props.notifyMsg}</p>
          <button className="close-btn" onClick={close}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Toaster;
