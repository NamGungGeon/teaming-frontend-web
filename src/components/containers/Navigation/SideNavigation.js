import React, {Component} from 'react';
import {quickConnect} from "../../redux";
import './SideNavigation.css';
import Footer from "../Footer/Footer";
import HorizontalNavigation from "./HorizontalNavigation";

class SideNavigation extends Component {
  render() {
    console.log(this.props);
    const {sideNav, SideNavDispatcher}= this.props;

    return (
      <div
        className={'sidenav'}>
        <div style={{
          paddingTop: '16px'
        }}>
          <HorizontalNavigation nav={sideNav.nav}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default quickConnect(SideNavigation);