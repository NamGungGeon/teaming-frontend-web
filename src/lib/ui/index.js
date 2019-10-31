import React from 'react';
import {Toaster} from "./Toaster";
import {Exception} from "./Exception";
import {Loader} from "./Loader";
import {PopupMaker} from "./PopupMaker";
import {Tooltip} from "./Tooltip";


export const UiBundle= (component)=>{
    if(!component.state){
        component.state= {};
    }

    const bundle= {
        toaster: Toaster(component),
        exception: Exception(component),
        loading: Loader(component),
        popup: PopupMaker(component),
        subPopup: PopupMaker(component),
        tooltip: Tooltip(component),
    };
    bundle.render= ()=>{
        return (<div>
            {bundle.toaster.toasts()}
            {bundle.exception.render()}
            {bundle.loading.render()}
            {bundle.popup.render()}
            {bundle.subPopup.render()}
            {bundle.tooltip.render()}
        </div>);
    };

    return bundle;
};


