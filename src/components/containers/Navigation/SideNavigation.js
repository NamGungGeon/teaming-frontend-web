import React, {Component} from 'react';
import {quickConnect} from "../../redux";
import './SideNavigation.css';
import Footer from "../Footer/Footer";

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
        <div style={{
          paddingTop: '16px'
        }}>
          {sideNav.content}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default quickConnect(SideNavigation);