import React, { Component } from 'react';
import { quickConnect } from '../../../redux/quick';
import {authorized, pageDescription} from '../../../utils/utils';
import { getPath } from '../../../utils/url';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { Route } from 'react-router-dom';
import Info from './info/Info';
import Community from './community/Community';
import Service from './service/Service';

class MyPage extends Component {
  async componentDidMount() {
    pageDescription("티밍: 마이페이지", "내 정보");

    //init sideNav
    this.props.SideNavDispatcher.set({
      회원정보: [
        {
          label: '내 정보',
          onClick: () => {
            history.push(getPath(`/mypage/info`));
          }
        },
        {
          label: '비밀번호 변경',
          onClick: () => {
            history.push(getPath(`/mypage/info/change/pw`));
          }
        },
        {
          label: '회원탈퇴',
          onClick: () => {
            history.push(getPath(`/mypage/info/escape`));
          }
        }
      ],
      커뮤니티: [
        {
          label: '알림',
          onClick: () => {
            history.push(getPath(`/mypage/community/notifications`));
          }
        },
        {
          label: '활동기록',
          onClick: () => {
            history.push(getPath(`/mypage/community/logs`));
          }
        },
        {
          label: '친구목록',
          onClick: () => {
            history.push(getPath(`/mypage/community/friends`));
          }
        },
        {
          label: '차단관리',
          onClick: () => {
            history.push(getPath(`/mypage/community/blocks`));
          }
        },
        {
          label: '쪽지함',
          onClick: () => {
            history.push(getPath(`/mypage/community/message`));
          }
        }
      ],
      고객센터: [
        {
          label: '내 문의내역',
          onClick: () => {
            history.push(getPath(`/mypage/service/asked`));
          }
        },
        {
          label: '1:1 문의',
          onClick: () => {
            history.push(getPath(`/mypage/service/asking`));
          }
        },
        {
          label: '제재내역',
          onClick: () => {
            history.push(getPath(`/mypage/service/illegal`));
          }
        }
      ]
    });

    //check auth query
    const { auth, history } = this.props;
    if (!authorized(auth)) {
      //fuck off!
      window.alert('로그인이 필요한 서비스입니다');
      history.push(getPath(`/`));
    }
  }

  componentWillUnmount() {
    pageDescription();
    this.props.SideNavDispatcher.remove();
  }

  render() {
    return (
      <div>
        <Route
          exact
          path={getPath(`/mypage`)}
          component={() => {
            return (
              <PageTitle
                title={'마이페이지'}
                explain={
                  <div>
                    <p className={'mobile explain'}>
                      좌측 상단 메뉴 아이콘을 클릭하여 마이페이지 메뉴를
                      이용하실 수 있습니다
                    </p>
                    <p className={'desktop explain'}>
                      좌측 네비게이션으로 마이페이지 메뉴를 이용하실 수 있습니다
                    </p>
                  </div>
                }
              />
            );
          }}
        />
        <Route path={getPath(`/mypage/info`)} component={Info} />
        <Route path={getPath(`/mypage/community`)} component={Community} />
        <Route path={getPath(`/mypage/service`)} component={Service} />
      </div>
    );
  }
}

export default quickConnect(MyPage);
