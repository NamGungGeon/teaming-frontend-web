import React from 'react';
import { Toaster } from './Toaster';
import { Loader } from './Loader';
import { PopupMaker } from './PopupMaker';

export const UiBundle = component => {
  if (!component.state) {
    component.state = {};
  }

  const bundle = {
    toaster: Toaster(component),
    loading: Loader(component),
    popup: PopupMaker(component),
    subPopup: PopupMaker(component)
  };

  bundle.render = () => {
    return (
      <div>
        {bundle.toaster.toasts()}
        {bundle.loading.render()}
        {bundle.popup.render()}
        {bundle.subPopup.render()}
      </div>
    );
  };

  return bundle;
};
