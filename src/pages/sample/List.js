import React, {Component} from 'react';
import PageTitle from "../../components/PageTitle/PageTitle";
import SimpleList from "../../containers/SimpleList/SimpleList";
import {quickConnect} from "../../redux";
import {getPath} from "../../lib/url";

class List extends Component {
    rows= [
        {title: 'Polaroids', explain: 'Polaroid Zone!!', onClick: ()=>{this.move('polaroids')}},
        {title: 'Login', explain: 'Login Zone', onClick: ()=>{this.move('login')}},
        {title: 'UIKit', explain: 'UIKit Zone', onClick: ()=>{this.move('uikit')}},
        {title: 'Deving', explain: 'Express not finished dev function', onClick: ()=>{this.move('deving')}},
        {title: 'Shape', explain: 'Image Shape Bundles', onClick: ()=>{this.move('shape')}},
        {title: 'Windows', explain: 'Window component', onClick: ()=>{this.move('windows')}},
    ]

    move= (category)=>{
        this.props.history.push(getPath(`${this.props.match.url}/${category}`));
    }
    render() {
        return (
            <div>
                <PageTitle title={'Sample lists'} explain={'select what you want to view!'} centering/>
                <SimpleList rows={this.rows}/>
            </div>
        );
    }
}

export default quickConnect(List);