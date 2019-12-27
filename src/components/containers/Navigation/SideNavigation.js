import React, {Component} from 'react';
import {quickConnect} from "../../redux";
import './SideNavigation.css';

class SideNavigation extends Component {
  render() {
    console.log(this.props);
    const {sideNav, SideNavDispatcher}= this.props;

    if(!sideNav.content){
      return '';
    }
    return (
      <div
        className={'sidenav'}>
        {sideNav.content}
      </div>
    );
  }
}

export default quickConnect(SideNavigation);