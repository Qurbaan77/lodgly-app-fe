import React, { useEffect } from "react";
import "./toaster.css";




const Toaster = () => {
    return (
        <div className="toster">
          
          <div className="error">
                <p>Your limit of applications has been reached!</p>
                <button className="close-btn">Close</button>
          </div>


          <div className="success">
                <p>Your have successfully login!</p>
                <button className="close-btn">Close</button>
          </div>


          <div className="warning">
                <p>Your have one warning!</p>
                <button className="close-btn">Close</button>
          </div>
          
        </div>
    );
  };
  
  export default Toaster;