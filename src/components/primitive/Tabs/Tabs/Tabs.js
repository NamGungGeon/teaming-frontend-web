import React, { useState } from 'react';
import styles from './Tabs.module.css';
import Tab from '../Tab/Tab';
import Section from '../../Section/Section';

const Tabs = ({ initActive, tabs, handleTab }) => {
  const [activated, setActivated] = useState(initActive);
  return (
    <Section
      style={{
        padding: '4px'
      }}
    >
      <div className={styles.tabs}>
        {tabs.map(tab => {
          const { startIcon, label } = tab;
          return (
            <Tab
              startIcon={startIcon}
              onClick={() => {
                setActivated(label);
                handleTab(label);
              }}
              active={label === activated}
              label={label}
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
