import ToastMessage from '../primitive/Msg/ToastMessage';
import React from 'react';

export const Toaster = component => {
  return {
    cooking: (msg, lastTime) => {
      const cooked = component.state.msg ? component.state.msg : [];
      cooked.push(msg);
      component.setState({
        ...component.state,
        msg: cooked
      });
      //remove after lastTime seconds
      window.setTimeout(
        () => {
          const { msg } = component.state;
          msg.shift();

          component.setState({
            ...component.state,
            msg
          });
        },
        lastTime ? lastTime : 1500
      );
    },
    render: () => {
      return <ToastMessage msg={component.state.msg} />;
    },
    destroy: () => {
      component.setState({
        ...component.state,
        msg: []
      });
    }
  };
};
