import React, {Component} from 'react';

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