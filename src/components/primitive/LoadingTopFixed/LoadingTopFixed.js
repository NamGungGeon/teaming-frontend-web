import React, {Component} from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";

const LoadingTopFixed= ({color})=>{

  return (
    <LinearProgress
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: '99999',
      }}
      color={color? color: 'primary'}
    />
  );
};

export default LoadingTopFixed;