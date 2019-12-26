import React, {Component} from 'react';
import Divider from "../../../primitive/Divider/Divider";
import EventGallery from "../../../containers/EventGallery/EventGallery";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import {quickConnect} from "../../../redux";
import {getEvent, getEvents} from "../../../http/tming";
import {getPath, urlQuery} from "../../../utils/url";
import {errMsg} from "../../../http/util";
import ImageView from "../../../primitive/ImageView/ImageView";
import moment from "moment";

class EventView extends Component {
  state= {
    event: null,
  };

  async componentDidMount() {
    const {uiKit, location, match}= this.props;

    uiKit.loading.start();
    await getEvent(match.params.id).then(response=>{
      this.setState({
        ...this.state,
        event: response.data,
      });
      console.log(response.data);
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  }

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }

  dateFormatting= (date)=>{
    return moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format('YYYY[년]MM[월]DD[일 ]HH[시]mm[분]');
  };
  lastDays= (start, end)=>{
    const startDate= moment(start, 'YYYY-MM-DD[T]HH:mm:ss.ZZZ[Z]');
    const endDate= moment(end, 'YYYY-MM-DD[T]HH:mm:ss.ZZZ[Z]');

    return endDate.diff(startDate, 'days');
  }

  render() {
    const {event}= this.state;

    return (
      <div>
        {
          event &&
          (<div>
            <h3>{event.title}</h3>
            <p className={'explain'}>
              {this.dateFormatting(event.startDate)}부터 {this.dateFormatting(event.endDate)}까지
              <br/>
              (이벤트 종료까지 {this.lastDays(event.startDate, event.endDate)}일 남았습니다)
            </p>
            <br/><br/>
            <ImageView
              width={'100%'}
              img={event.banner}/>
            <br/><br/>
            <p>
              {event.text}
            </p>
          </div>)
        }
      </div>
    );
  }
}

export default quickConnect(EventView);