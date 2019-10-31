
import React from 'react';

export const Tooltip= (component)=>{
    let _style= {
        position: 'fixed',
        zIndex: '9999',
        background: 'black',
        padding: '0.3rem',
        top: '0',
        left: '0',
        color: 'white',
        borderRadius: '4px',
    };
    component.setState({
        ...component.state,
        _style: _style,
    });
    return {
        render: ()=>{
            return (
                <span>
                    {component.state.msg_rnd? (<span  style={component.state._style}>{component.state.msg_rnd}</span>): ''}
                </span>);
        },
        on: (e, msg)=>{
            // component.setState({
            //     ...component.state,
            //     _style: component.state._style.assign({
            //         top: e.clientY.toString()+ 'px',
            //         left: e.clientX.toString()+ 'px',
            //     }),
            //     msg_rnd: msg,
            // });
        },
        off: ()=>{
            component.setState({
                ...component.state,
                msg_rnd: '',
            });
        }
    };
};