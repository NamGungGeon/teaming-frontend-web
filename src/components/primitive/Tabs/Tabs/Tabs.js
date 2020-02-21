import React, { Component, useState } from 'react';
import classNames from 'classnames';
import styles from './Tabs.module.css';
import Tab from '../Tab/Tab';
import Section from '../../Section/Section';

const Tabs = ({ initActive, tabs, handleTab }) => {
  const [activated, setActivated] = useState(initActive);
  return (
    <Section
      style={{
        padding: '0!important'
      }}
    >
      <div className={styles.tabs}>
        {tabs.map(tab => {
          return (
            <Tab
              startIcon={tab.startIcon}
              onClick={() => {
                setActivated(tab.label);
                handleTab(tab.label);
              }}
              active={tab.label === activated}
              label={tab.label}
            />
          );
        })}
      </div>
      <br />
      <div>
        {tabs.map(tab => {
          return tab.label === activated && tab.content;
        })}
      </div>
    </Section>
  );
};

Tabs.defaultProps = {
  tabs: [],
  handleTab: label => {}
};

export default Tabs;
