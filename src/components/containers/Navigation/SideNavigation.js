import React from 'react';
import { quickConnect } from '../../../redux/quick';
import './SideNavigation.css';
import Footer from '../Footer/Footer';
import HorizontalNavigation from './HorizontalNavigation';

const SideNavigation = props => {
  const { sideNav } = props;

  return (
    <div className={'sidenav'}>
      <div
        style={{
          paddingTop: '16px'
        }}
      >
        <HorizontalNavigation nav={sideNav.nav} />
      </div>
      <Footer />
    </div>
  );
};

export default quickConnect(SideNavigation);
