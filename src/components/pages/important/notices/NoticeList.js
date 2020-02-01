import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../../../redux/quick';
import { createNotice, getMyProfile, getNotices } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Input from 'reactstrap/es/Input';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Section from '../../../primitive/Section/Section';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import moment from 'moment';
import {authorized, pageDescription} from '../../../../utils/utils';

class NoticeList extends Component {
  state = {
    notices: null,
    newNoticeTitle: '',
    newNoticeText: '',

    isAdmin: false,

    open: 0
  };

  async componentDidMount() {
    const { uiKit, auth } = this.props;
    pageDescription("티밍: 공지사항", "티밍 공지사항");

    uiKit.loading.start();
    await getNotices()
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          notices: response.data.data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();

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

  createNewNotice = () => {
    const { uiKit, auth } = this.props;
    uiKit.popup.make(
      <div>
        <h3>새로운 공지사항 등록</h3>
        <br />
        <Input
          className={'transparent'}
          type={'text'}
          onChange={e => {
            this.setState({
              ...this.state,
              newNoticeTitle: e.target.value
            });
          }}
          placeholder={'제목을 입력하세요'}
        />
        <br />
        <Input
          className={'transparent'}
          type={'textarea'}
          style={{ height: '300px' }}
          onChange={e => {
            this.setState({
              ...this.state,
              newNoticeText: e.target.value
            });
          }}
          placeholder={'내용을 입력하세요'}
        />
        <br />
        <br />

        <AlignLayout align={'right'}>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              //submit
              const { newNoticeTitle, newNoticeText } = this.state;

              uiKit.loading.start();
              await createNotice(auth, newNoticeTitle, newNoticeText)
                .then(response => {
                  uiKit.toaster.cooking('등록 완료');
                  uiKit.popup.destroy();
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();

              //reload
              this.componentDidMount();
            }}
          >
            등록
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              uiKit.popup.destroy();
            }}
          >
            닫기
          </Button>
        </AlignLayout>
      </div>,
      true
    );
  };

  dateFormatting = date => {
    return moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format(
      'YYYY[년]MM[월]DD[일 ]HH[시]mm[분]'
    );
  };

  render() {
    const { notices, isAdmin, open } = this.state;

    return (
      <div>
        <PageTitle
          title={'공지사항 리스트'}
          explain={'주요 공지사항입니다'}
          align={'left'}
        />
        {isAdmin && (
          <Section divideStyle={'fill'}>
            <h5>관리자 메뉴</h5>
            <AlignLayout align={'right'}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.createNewNotice}
              >
                새로운 공지사항 등록
              </Button>
            </AlignLayout>
          </Section>
        )}
        {notices &&
          (notices.length > 0 ? (
            notices.map(notice => {
              return (
                <ExpansionPanel expanded={notice.id === open}>
                  <ExpansionPanelSummary
                    onClick={() => {
                      if (open === notice.id) {
                        this.setState({
                          ...this.state,
                          open: 0
                        });
                      } else {
                        this.setState({
                          ...this.state,
                          open: notice.id
                        });
                      }
                      //history.push(getPath(`/important/notices/${notice.id}`));
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <div>
                      <span>{notice.title}</span>
                      <br />
                      <span className={'explain'}>
                        {this.dateFormatting(notice.createdAt)}
                      </span>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    style={{
                      flexDirection: 'column'
                    }}
                  >
                    {notice.text}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })
          ) : (
            <p>공지사항이 없습니다</p>
          ))}
      </div>
    );
  }
}

export default quickConnect(NoticeList);
