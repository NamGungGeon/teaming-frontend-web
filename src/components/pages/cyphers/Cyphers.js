import React, { Component } from 'react';
import { quickConnect } from '../../../redux/quick';
import { Route } from 'react-router-dom';
import Characters from './Characters';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { pageDescription } from '../../../utils/utils';
import Attributes from './Attributes';
import Players from './Players';

class Cyphers extends Component {
  componentDidMount() {
    const { history } = this.props;
    pageDescription('티밍:: 사이퍼즈 서포터', '티밍 X 사이퍼즈 서포터');
    const nav = {
      '공략 및 분석': [
        {
          label: '캐릭터',
          onClick: () => {
            history.push('/cyphers/characters');
          }
        },
        {
          label: '특성',
          onClick: () => {
            history.push('/cyphers/attributes');
          }
        },
        {
          label: '전적검색',
          onClick: () => {
            history.push('/cyphers/players');
          }
        },
        {
          label: '랭킹',
          onClick: () => {
            alert('개발중입니다');
            return;
            // history.push('/cyphers/ranking');
          }
        }
      ],
      커뮤니티: [
        {
          label: '사이퍼즈 게시판',
          onClick: () => {
            history.push('/community?category=cyphers');
          }
        }
      ],
      다운로드: [
        {
          label: '사이퍼즈 서포터',
          onClick: () => {
            window.open(
              'https://play.google.com/store/apps/details?id=kr.co.dothome.whenever.cyphersapp&hl=ko'
            );
          }
        }
      ]
    };
    this.props.SideNavDispatcher.set(nav);
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
          path={'/cyphers'}
          render={() => {
            return (
              <PageTitle
                title={'사이퍼즈 서포터 X 티밍'}
                explain={
                  <div>
                    <p>
                      이 페이지는 <a href="https://cpsp.kr">https://cpsp.kr</a>
                      로도 접속할 수 있습니다
                    </p>
                    좌측에서 필요한 메뉴를 선택하세요
                  </div>
                }
              />
            );
          }}
        />
        <Route exact path={'/cyphers/characters'} component={Characters} />
        <Route exact path={'/cyphers/attributes'} component={Attributes} />
        <Route exact path={'/cyphers/players'} component={Players} />
      </div>
    );
  }
}

export default quickConnect(Cyphers);
