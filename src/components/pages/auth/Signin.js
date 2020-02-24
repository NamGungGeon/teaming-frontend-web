import React, { Component, useEffect } from "react";
import { quickConnect } from "../../../redux/quick";

const Signin = ({history, auth})=> {
  useEffect(()=>{
    window.auth= auth;
    history.push('/');
  });
  return (
    <div>

    </div>
  );
}

export default quickConnect(Signin);