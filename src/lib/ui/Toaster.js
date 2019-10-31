import ToastMessage from "../../components/Msg/ToastMessage";
import React from 'react';

export const Toaster= (component)=>{
    return {
        cooking: (msg, interval)=>{
            const temp= component.state.msg? component.state.msg: [];
            temp.push(msg);
            component.setState({
                ...component.state,
                msg: temp
            });
            window.setTimeout(()=>{
                const tempp= component.state.msg? component.state.msg: [];
                component.setState({
                    ...component.state,
                    msg: tempp.map((value)=>{
                        return value===msg? null: value;
                    })
                })
            }, interval? interval: 1500);
        },
        toasts: ()=>{
            return component.state.msg? (<ToastMessage msg={component.state.msg}/>): '';
        },
    }
};