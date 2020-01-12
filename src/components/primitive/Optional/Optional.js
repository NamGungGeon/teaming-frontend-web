import React, {Component} from 'react';

const Optional= ({visible, children})=>{
  if(!visible)
    return (<div/>);

  return (
    <span>
      {children}
    </span>
  );
}

export default Optional;