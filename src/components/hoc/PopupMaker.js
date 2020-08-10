import React from 'react';
import Popup from '../primitive/Popup/Popup';
import { randStr } from '../../utils/utils';

export const PopupMaker = component => {
  const prefix = randStr();
  const ret = {
    make: (content, preventClose) => {
      component.setState({
        ...component.state,
        ['popupContent' + prefix]: content ? content : '',
        ['popupCloseable' + prefix]: !preventClose,
        ['popupButtons' + prefix]: null
      });

      console.log('popup', component);
    },
    open: (content, buttons) => {
      component.setState({
        ...component.state,
        ['popupContent' + prefix]: content ? content : '',
        ['popupCloseable' + prefix]: true,
        ['popupButtons' + prefix]: buttons
      });

      console.log('popup', component);
    },
    destroy: () => {
      component.setState({
        ...component.state,
        ['popupContent' + prefix]: ''
      });
    },
    render: () => {
      return component.state['popupContent' + prefix] ? (
        <Popup
          buttons={component.state['popupButtons' + prefix]}
          plzClose={() => {
            if (component.state['popupCloseable' + prefix]) ret.destroy();
          }}
        >
          {component.state['popupContent' + prefix]}
        </Popup>
      ) : (
        ''
      );
    }
  };
  return ret;
};
