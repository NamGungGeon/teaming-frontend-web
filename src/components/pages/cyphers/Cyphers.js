import React, { Component } from 'react';
import { quickConnect } from '../../../redux/quick';
import { pageDescription } from '../../../utils/utils';

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
        },
        {
          label: '포스트',
          onClick: () => {
            history.push('/cyphers/posts');
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
        <h3>더 이상 티밍에서 사이퍼즈 서포터를 이용할 수 없습니다</h3>
        <br />
        <h4>
          계속하시려면{' '}
          <a
            href="https://cpsp.kr"
            style={{
              fontSize: '1.2rem',
              color: 'blue !important'
            }}
          >
            https://cpsp.kr (사이퍼즈 서포터 웹사이트)
          </a>
          로 이동하세요
        </h4>
      </div>
    );
  }
}

export default quickConnect(Cyphers);
