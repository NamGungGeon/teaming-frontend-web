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
    spopup: PopupMaker(component),
    destroyAll: ()=>{
       bundle.toaster.destroy();
       bundle.loading.end();
       bundle.popup.destroy();
       bundle.spopup.destroy();
    }
  };

  bundle.render = () => {
    return (
      <>
        {bundle.toaster.render()}
        {bundle.loading.render()}
        {bundle.popup.render()}
        {bundle.spopup.render()}
      </>
    );
  };

  return bundle;
};
