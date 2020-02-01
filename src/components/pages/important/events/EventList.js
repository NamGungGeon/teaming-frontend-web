import React, { Component } from 'react';
import EventGallery from '../../../containers/EventGallery/EventGallery';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import Section from '../../../primitive/Section/Section';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import Input from 'reactstrap/es/Input';
import { createEvent, getMyProfile } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import { quickConnect } from '../../../../redux/quick';
import FormGroup from 'reactstrap/es/FormGroup';
import Col from 'reactstrap/es/Col';
import {authorized, pageDescription} from '../../../../utils/utils';

class EventList extends Component {
  state = {
    newEventTitle: '',
    newEventText: '',
    bannerFile: null,
    startDate: null,
    endDate: null,

    isAdmin: false
  };

  componentDidMount() {
    const { auth } = this.props;
    pageDescription("티밍: 이벤트", "티밍의 푸짐한 이벤트에 참여하세요");

    if (authorized(auth))
      getMyProfile(auth).then(response => {
        const { role } = response.data;
        if (role === 'ADMIN')
          this.setState({
            ...this.state,
            isAdmin: true
          });
      });
  }

  componentWillUnmount() {
    pageDescription();
  }

  render() {
    return (
      <div>
        <PageTitle
          title={'진행중인 이벤트'}
          explain={'진행중인 모든 이벤트를 확인할 수 있습니다'}
          align={'left'}
        />
        <Section>
          <EventGallery
            ref={ref => (this.eventList = ref)}
            history={this.props.history}
          />
        </Section>
      </div>
    );
  }
}

export default quickConnect(EventList);
