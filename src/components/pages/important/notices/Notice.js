import React, { Component } from 'react';
import { quickConnect } from '../../../../redux/quick';
import { getMyProfile, getNotice, removeNotice } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import Section from '../../../primitive/Section/Section';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import { getPath } from '../../../../utils/url';
import { authorized } from '../../../../utils/utils';

class Notice extends Component {
  state = {
    notice: null,
    isAdmin: false
  };
  removeNotice = () => {
    const { uiKit, auth, match, history } = this.props;

    uiKit.popup.make(
      <div>
        <h5>이 공지사항을 삭제하시겠습니까?</h5>
        <br />
        <AlignLayout align={'right'}>
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={async () => {
              uiKit.loading.start();
              await removeNotice(auth, match.params.id)
                .then(response => {
                  //ok removed!
                  uiKit.popup.destroy();
                  alert('삭제되었습니다');
                  history.push(getPath(`/important/notices`));
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();
            }}
          >
            삭제
          </Button>
          &nbsp;&nbsp;
          <Button
            color={'secondary'}
            variant={'contained'}
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

  async componentDidMount() {
    window.scrollTo(0, 0);

    const { uiKit, match, auth } = this.props;
    const { params } = match;

    const { id } = params;
    uiKit.loading.start();
    await getNotice(id)
      .then(response => {
        this.setState({
          ...this.state,
          notice: response.data
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

  render() {
    const { notice, isAdmin } = this.state;
    return (
      <div>
        {isAdmin && (
          <Section divideStyle={'fill'}>
            <h5>관리자 메뉴</h5>
            <AlignLayout align={'right'}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.removeNotice}
              >
                이 공지사항 삭제
              </Button>
            </AlignLayout>
          </Section>
        )}
        {notice ? (
          <Section>
            <div>
              <h3>{notice.title}</h3>
              <br />
              <p>{notice.text}</p>
            </div>
          </Section>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default quickConnect(Notice);
