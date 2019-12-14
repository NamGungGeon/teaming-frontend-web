import React, {Component} from 'react';
import EventGallery from "../../containers/EventGallery/EventGallery";
import PageTitle from "../../primitive/PageTitle/PageTitle";

class EventList extends Component {
  render() {
    return (
      <div>
        <PageTitle title={'진행중인 이벤트'} explain={'진행중인 모든 이벤트를 확인할 수 있습니다'} align={'center'}/>
        <EventGallery history={this.props.history}/>
      </div>
    );
  }
}

export default EventList;