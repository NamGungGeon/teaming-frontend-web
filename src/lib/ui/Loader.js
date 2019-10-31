
import React from 'react';
import Loading from "../../components/Loading/Loading";

export const Loader= (component)=>{
    return {
        start: ()=>{
            component.setState({
                ...component.state,
                isLoading: true
            });
        },
        end: ()=>{
            component.setState({
                ...component.state,
                isLoading: false
            });
        },
        render: ()=>{
            return component.state.isLoading? (<Loading/>): '';
        },
    }
};