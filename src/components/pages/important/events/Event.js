import React, {Component} from 'react';
import Divider from "../../../primitive/Divider/Divider";
import EventGallery from "../../../containers/EventGallery/EventGallery";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import {quickConnect} from "../../../redux";
import {getEvent, getEvents, removeEvent} from "../../../http/tming";
import {getPath, urlQuery} from "../../../utils/url";
import {errMsg} from "../../../http/util";
import ImageView from "../../../primitive/ImageView/ImageView";
import moment from "moment";
import Section from "../../../primitive/Section/Section";
import Button from "@material-ui/core/Button";

class Event extends Component {
  state= {
    event: null,
  };

  async componentDidMount() {
    const {uiKit, match}= this.props;

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
  };

  removeEvent= ()=> {
    const {uiKit, auth, match, history} = this.props;

    uiKit.popup.make(
      (<div>
        <h5>이 이벤트를 삭제하시겠습니까?</h5>
        <br/>
        <AlignLayout align={'right'}>
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={async ()=>{
              uiKit.loading.start();
              await removeEvent(auth, match.params.id).then(response => {
                //ok removed!
                uiKit.popup.destroy();
                alert('삭제되었습니다');
                history.push(getPath(`/important/events`));
              }).catch(e=>{
                uiKit.toaster.cooking(errMsg(e));
              });
              uiKit.loading.end();
            }}>
            삭제
          </Button>
          &nbsp;&nbsp;
          <Button
            color={'secondary'}
            variant={'contained'}
            onClick={()=>{
              uiKit.popup.destroy();
            }}>
            닫기
          </Button>
        </AlignLayout>
      </div>)
    , true);
  };

  render() {
    const {event}= this.state;

    return (
      <div>
        {
          event &&
          (<div>
            <Section divideStyle={'fill'}>
              <h5>관리자 메뉴</h5>
              <AlignLayout align={'right'}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.removeEvent}>
                  이 이벤트 삭제
                </Button>
              </AlignLayout>
            </Section>
            <br/>
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

export default quickConnect(Event);