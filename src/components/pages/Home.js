import React, { Component, useEffect } from 'react';
import AlignLayout from '../layouts/AlignLayout/AlignLayout';
import UsefulInformation from '../containers/UsefulInformation/UsefulInformation';
import { quickConnect } from '../../redux/quick';
import Magazine from '../containers/Magazine/Magazine';
import HottestPosts from '../containers/HottestPosts/HottestPosts';
import { pageDescription } from '../../utils/utils';
import Window from '../primitive/Window/Window';

const Home = ({ history }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    pageDescription();
  }, []);

  return (
    <AlignLayout align="left">
      <UsefulInformation />
      <br />
      <Window
        title={
          <span
            style={{
              cursor: 'pointer'
            }}
            onClick={() => {
              history.push('/magazine');
            }}
          >
            매거진
          </span>
        }
      >
        <Magazine max={4} />
      </Window>
      <br />
      <HottestPosts />
      <br />
    </AlignLayout>
  );
};

export default quickConnect(Home);
