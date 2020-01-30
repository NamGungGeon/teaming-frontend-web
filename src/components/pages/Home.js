import React, { Component } from 'react';
import AlignLayout from '../layouts/AlignLayout/AlignLayout';
import { getPath } from '../../utils/url';
import UsefulInformation from '../containers/UsefulInformation/UsefulInformation';
import { quickConnect } from '../../redux/quick';
import HelpAppInstall from '../containers/HelpAppInstall/HelpAppInstall';
import GoogleAdvertise from '../containers/GoogleAdvertise/GoogleAdvertise';
import Magazine from '../containers/Magazine/Magazine';
import Section from '../primitive/Section/Section';
import HottestPosts from '../containers/HottestPosts/HottestPosts';

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { history } = this.props;

    return (
      <AlignLayout align="left">
        <HelpAppInstall />
        <UsefulInformation />
        <br />
        <GoogleAdvertise />
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
          <br />
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
