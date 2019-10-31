
import React from 'react';
import FatalAlert from "../../components/FatalAlert/FatalAlert";

export const Exception= (component)=>{
    return {
        raise: (msg)=>{
            component.setState({
               ...component.state,
               exceptionMsg: msg!== undefined? msg: ''
            });
        },
        render: ()=>{
            return component.state.exceptionMsg!== undefined? (<FatalAlert msg={component.state.exceptionMsg}/>): '';
        },
    }
};