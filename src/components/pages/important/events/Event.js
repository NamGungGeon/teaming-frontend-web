import React, {Component} from 'react';
import Divider from "../../../primitive/Divider/Divider";
import EventGallery from "../../../containers/EventGallery/EventGallery";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import {quickConnect} from "../../../redux";
import {getEvent, getEvents, getMyProfile, removeEvent} from "../../../http/tming";
import {getPath, urlQuery} from "../../../utils/url";
import {errMsg} from "../../../http/util";
import ImageView from "../../../primitive/ImageView/ImageView";
import moment from "moment";
import Section from "../../../primitive/Section/Section";
import Button from "@material-ui/core/Button";
import {authorized, beautifyDate, lastDays} from "../../../utils/utils";

class Event extends Component {
  state= {
    event: null,
    isAdmin: false,
  };

  async componentDidMount() {
    const {uiKit, match, auth}= this.props;

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


    if(authorized(auth))
      getMyProfile(auth).then(response=>{
        const {role}= response.data;
        if(role=== 'ADMIN')
          this.setState({
            ...this.state,
            isAdmin: true,
          })
      });
  }

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }

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
    const {event, isAdmin}= this.state;

    return (
      <div>
        {
          event &&
          (<div>
            {
              isAdmin &&
              (
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
              )
            }
            <br/>
            <h3>{event.title}</h3>
            <p className={'explain'}>
              {beautifyDate(event.startDate)}부터 {beautifyDate(event.endDate)}까지
              <br/>
              (이벤트 종료까지 {lastDays(event.endDate)}일 남았습니다)
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