import React, {Component} from 'react';
import Section from "../Section/Section";

const Optional= ({visible, children})=>{
  if(!visible)
    return (<div/>);

  return (
    <div>
      {children}
    </div>
  );
}

export default Optional;