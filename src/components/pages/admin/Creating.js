import React, { Component } from 'react';
import Section from '../../primitive/Section/Section';
import { quickConnect } from '../../../redux/quick';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import Input from 'reactstrap/es/Input';
import FormGroup from 'reactstrap/es/FormGroup';
import Col from 'reactstrap/es/Col';
import { createEvent, createNotice } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import { getPath } from '../../../utils/url';

class Creating extends Component {
  state = {};

  createNewEvent = () => {
    const { uiKit, auth, history } = this.props;
    uiKit.popup.make(
      <div>
        <h3>새로운 이벤트 등록</h3>
        <br />
        <Input
          className={'transparent'}
          type={'text'}
          onChange={e => {
            this.setState({
              ...this.state,
              newEventTitle: e.target.value
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
              newEventText: e.target.value
            });
          }}
          placeholder={'내용을 입력하세요'}
        />
        <br />
        <FormGroup row>
          <Col sm={3}>
            <b>베너 이미지</b>
          </Col>
          <Col sm={9}>
            <input
              accept="image/*"
              type={'file'}
              onChange={async () => {
                const { uiKit } = this.props;

                //input file is changed
                const file = this.bannerFile.files[0];
                const url = window.URL.createObjectURL(file);
                console.log(url);
                console.log(file);
                if (file) {
                  const mb = file.size / (1024 * 1024);
                  if (mb >= 1) {
                    uiKit.toaster.cooking('1MB이하의 사진만 업로드 가능합니다');
                    return;
                  }

                  //save file info
                  this.setState({
                    ...this.state,
                    bannerFile: file
                  });
                }
              }}
              ref={ref => {
                this.bannerFile = ref;
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={3}>
            <b>시작일</b>
          </Col>
          <Col sm={9}>
            <Input
              type={'datetime-local'}
              onChange={e => {
                this.setState({
                  ...this.state,
                  startDate: e.target.value + ':00'
                });
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={3}>
            <b>종료일</b>
          </Col>
          <Col sm={9}>
            <Input
              type={'datetime-local'}
              onChange={e => {
                this.setState({
                  ...this.state,
                  endDate: e.target.value + ':00'
                });
              }}
            />
          </Col>
        </FormGroup>
        <br />
        <br />

        <AlignLayout align={'right'}>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              const {
                newEventTitle,
                newEventText,
                bannerFile,
                startDate,
                endDate
              } = this.state;

              //valid check
              if (
                newEventTitle &&
                newEventText &&
                bannerFile &&
                startDate &&
                endDate
              ) {
                uiKit.loading.start();
                await createEvent(
                  auth,
                  newEventTitle,
                  newEventText,
                  bannerFile,
                  startDate,
                  endDate
                )
                  .then(response => {
                    //ok
                    uiKit.toaster.cooking('등록 완료!');
                    uiKit.popup.destroy();

                    history.push(getPath('/important/events'));
                  })
                  .catch(e => {
                    uiKit.toaster.cooking(errMsg(e));
                  });
                uiKit.loading.end();
              } else {
                uiKit.toaster.cooking('입력값은 모두 채워져야 합니다');
              }
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
  createNewNotice = () => {
    const { uiKit, auth, history } = this.props;
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

                  history.push(getPath('/important/notices'));
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();
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

  render() {
    const { history } = this.props;

    return (
      <div>
        <Section divideStyle={'fill'}>
          <h5>새로운 공지사항 등록</h5>
          <AlignLayout align={'right'}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.createNewNotice();
              }}
            >
              새로운 공지사항 등록
            </Button>
          </AlignLayout>
        </Section>
        <br />
        <Section divideStyle={'fill'}>
          <h5>새로운 이벤트 등록</h5>
          <AlignLayout align={'right'}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.createNewEvent();
              }}
            >
              새로운 이벤트 등록
            </Button>
          </AlignLayout>
        </Section>
        <br />
        <Section>
          <h5>새로운 매거진 등록</h5>
          <AlignLayout align={'right'}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push(`/community/write?category=magazine`);
              }}
            >
              새로운 매거진 등록
            </Button>
          </AlignLayout>
        </Section>
      </div>
    );
  }

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }
}

export default quickConnect(Creating);
