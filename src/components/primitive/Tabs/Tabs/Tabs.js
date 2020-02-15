import React, {Component, useState} from 'react';
import classNames from 'classnames';
import styles from './Tabs.module.css';
import Tab from "../Tab/Tab";

const Tabs = ({initActive, tabs})=> {
  const [activated, setActivated]= useState(initActive);
  return (
    <div className={styles.tabs}>
      {
        tabs.map(tab=>{
          return (
            <Tab
              startIcon={tab.startIcon}
              onClick={()=>{
                setActivated(tab.label);
                if(tab.onClick)
                  tab.onClick();
              }}
              active={tab.label=== activated}
              label={tab.label}/>
            );
        })
      }
    </div>
  );
};

Tabs.defaultProps= {
  tabs: [],
};

export default Tabs;