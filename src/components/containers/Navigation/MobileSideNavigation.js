import React, {Component} from 'react';
import {quickConnect} from "../../redux";
import styles from './MobileSideNavigation.module.css';
import HorizontalNavigation from "./HorizontalNavigation";

class MobileSideNavigation extends Component {
  render() {
    console.log(this.props);
    const {sideNav, SideNavDispatcher}= this.props;

    if(!sideNav.visible || !sideNav.content){
      return '';
    }
    return (
      <div
        onClick={()=>{
          SideNavDispatcher.toggle();
        }}
        className={styles.wrapper}>
        <div
          className={styles.sidenav}>
          <HorizontalNavigation nav={sideNav.nav}/>
        </div>
      </div>
    );
  }
}

export default quickConnect(MobileSideNavigation);