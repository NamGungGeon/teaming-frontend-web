import React, { Component } from 'react';
import AlignLayout from '../layouts/AlignLayout/AlignLayout';
import { getPath } from '../../utils/url';
import UsefulInformation from '../containers/UsefulInformation/UsefulInformation';
import { quickConnect } from '../../redux/quick';
import HelpAppInstall from '../containers/HelpAppInstall/HelpAppInstall';
import Magazine from '../containers/Magazine/Magazine';
import Section from '../primitive/Section/Section';
import HottestPosts from '../containers/HottestPosts/HottestPosts';
import RecommendYoutube from '../containers/RecommendYoutube/RecommendYoutube';
import { pageDescription } from '../../utils/utils';

class Home extends Component {
  componentDidMount() {
    pageDescription();
    window.scrollTo(0, 0);
  }

  render() {
    const { history } = this.props;

    return (
      <AlignLayout align="left">
        <HelpAppInstall />
        <UsefulInformation />
        <br />
        <Section>
          <b
            onClick={() => {
              history.push(getPath('/youtuber'));
            }}
            style={{
              cursor: 'pointer'
            }}
          >
            유튜브 홍보 게시판
          </b>
          <RecommendYoutube max={3} />
        </Section>
        <br />
        <Section>
          <h6
            style={{
              cursor: 'pointer'
            }}
            onClick={() => {
              history.push(getPath('/magazine'));
            }}
          >
            매거진
          </h6>
          <Magazine max={4} />
        </Section>
        <br />
        <HottestPosts />
        <br />
      </AlignLayout>
    );
  }
}

export default quickConnect(Home);
