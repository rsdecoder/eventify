import React from "react";
import { Vortex, MagnifyingGlass } from "react-loader-spinner";





const LoaderSpinner = ({message}) => {
  return (
    <div className="vortex-wrapper">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        // wrapperClass="vortex-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      {message? <p>{message}</p> :<p>Please bear with us while we fetch things for you</p>} 
    </div>
  );
};

export default LoaderSpinner;
