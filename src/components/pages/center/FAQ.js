import React, { Component } from 'react';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { getPath } from '../../../utils/url';
import Section from '../../primitive/Section/Section';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { NavLink } from 'react-router-dom';

const FAQ = ({ history }) => {
  const faqs = [
    {
      title: '티밍은 무엇을 하는 곳인가요?',
      body: (
        <div>
          <h6>
            티밍은 팀원과의 갈등을 해결하여 즐거운 게이밍 환경을 만들기 위해
            존재합니다
          </h6>
          <br />
          <p>
            대부분의 팀 게임은 사용자의 다양한 특성을 비교하지 않고, 비슷한
            실력을 가졌다고 판단되는 유저들을 매칭합니다.
            <br />
            <br />
            이는 매우 간단하고, 빠르게 팀원을 찾아 게임을 즐길 수 있다는 장점이
            있지만
            <br />
            다른 요인들을 고려하지 않기 때문에, 스트레스를 풀려고 하는 게임에서
            오히려 큰 스트레스를 받을 수 있습니다
            <br />
            <br />
            유저를 매칭시켜 줄 수 있고 티밍에서는 보다 다양한 정보를 수집하여
            사용자에게 맞는
            <br />
            마음에 드는 유저는 친구 추가 기능을 통해 마음이 맞는 유저와 지속적인
            게임 플레이가 가능하며
            <br />
            악성 유저의 경우 매칭 평가, 유저 차단 등의 기능을 통해 해당 유저와의
            접축을 차단할 수 있습니다
          </p>
        </div>
      )
    },
    {
      title: '티밍에서는 어떤 정보를 수집하나요?',
      body: (
        <div>
          <h6>회원가입에서 입력한 정보와 활동내역 수집합니다</h6>
          <br />
          <p>
            회원가입 시 입력한 이메일, 비밀번호, 성별, 닉네임은 자사의
            데이터베이스에 저장됩니다.
            <br />
            비밀번호의 경우 대한민국 정보통신망법에 의거하여 암호화하여 저장하고
            있으므로 관리자도 비밀번호 값은 알 수 없습니다
            <br />
            <br />
            또한 커뮤니티 글/댓글 작성내역, 채팅내역 등 사용자가 티밍에서 활동한
            내역 역시 저장됩니다
            <br />
            음란물 업로드, 성희롱, 명예훼손 등 범죄예방 목적으로 저장되며
            <br />
            티밍은 수사기관에 제공 가능한 모든 정보를 제공합니.
            <br />
            <br />
            <NavLink to={getPath('/privacy')}>
              <span
                style={{
                  color: '#3f51b5'
                }}
              >
                티밍의 개인정보 처리방침 원문을 보려면 여기를 클릭하세요
              </span>
            </NavLink>
          </p>
        </div>
      )
    },
    {
      title: '티밍 이용수칙 및 제재사유',
      body: (
        <div>
          <h6>
            타인의 서비스 이용을 방해하거나 사회적 통념에 어긋나는 행위 등은
            제재 대상입니다
          </h6>
          <br />
          <p>
            타인의 이용을 방해하는 행위(사이버 스토킹 등)나
            <br />
            미풍양속을 저해하는 행위와 같이 사회적 통념에 어긋나는 행위 적발 시,
            내부적 심사를 통해 제재가 가해집니다
            <br />
            <br />
            악의적인 트래픽 유발이나 해킹 시도 행위 적발 시, 이용제재와 함께
            수사기관에 의뢰를 통해 법적으로도 대응합니다.
            <br />
            <br />
            <NavLink to={getPath('/contact')}>
              <span
                style={{
                  color: '#3f51b5'
                }}
              >
                티밍의 이용약관 원문을 보려면 여기를 클릭하세요
              </span>
            </NavLink>
          </p>
        </div>
      )
    }
  ];
  //티밍에서 수집하는 정보의 종류
  //제휴문의 or
  //커뮤니티 이용수칙 / 제재사유

  return (
    <div>
      <PageTitle title={'고객센터'} explain={'도움이 필요하신가요?'} />
      <br />
      <br />
      <Section divideStyle={'fill'}>
        {faqs.map(faq => {
          return (
            <ExpansionPanel
              style={{
                boxShadow: 'none'
              }}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <h6
                  style={{
                    color: '#e71469'
                  }}
                >
                  Q. {faq.title}
                </h6>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                style={{
                  flexDirection: 'column'
                }}
              >
                <div>{faq.body}</div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
        <ExpansionPanel
          style={{
            boxShadow: 'none'
          }}
          onClick={() => {
            history.push(getPath('/center/create'));
          }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <h6>여기에서 해답을 찾을 수 없습니다</h6>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </Section>
    </div>
  );
};

export default FAQ;
