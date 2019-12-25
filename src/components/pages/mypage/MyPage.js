import React from 'react';
import {quickConnect} from "../../redux";
import {authorized} from "../../utils/utils";
import {getPath} from "../../utils/url";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import HorizontalSlicedLayout from "../../layouts/HorizontalSlicedLayout/HorizontalSlicedLayout";
import Window from "../../primitive/Window/Window";
import HorizontalNavigation from "../../containers/Navigation/HorizontalNavigation";
import {Route} from "react-router-dom";
import Info from "./info/Info";
import Community from "./community/Community";
import Service from "./service/Service";

const MyPage =({auth, history, match, location})=> {

  console.log('mypage', auth);
  if(!authorized(auth)){
    window.alert('로그인이 필요한 서비스입니다');
    history.push(getPath(`/`));
    return (<div></div>);
  }

  return (
    <div>
      <PageTitle title={'마이페이지'} explain={'내 정보'} align={'center'}/>
      <HorizontalSlicedLayout>
        <Window title={'메뉴'} foldable>
          <HorizontalNavigation
            nav={{
              '회원정보': [
                {label: '내 정보', onClick: ()=>{history.push(getPath(`/mypage/info`))}},
                {label: '비밀번호 변경', onClick: ()=>{history.push(getPath(`/mypage/info/change/pw`))}},
                {label: '회원탈퇴', onClick: ()=>{history.push(getPath(`/mypage/info/escape`))}},
              ],
              '커뮤니티': [
                {label: '친구목록', onClick: ()=>{history.push(getPath(`/mypage/community/friends`))}},
                {label: '차단관리', onClick: ()=>{history.push(getPath(`/mypage/community/shield`))}},
                {label: '쪽지함', onClick: ()=>{history.push(getPath(`/mypage/community/message`))}}
              ],
              '고객센터': [
                {label: '내 문의내역', onClick: ()=>{history.push(getPath(`/mypage/service/asked`))}}
                , {label: '1:1 문의', onClick: ()=>{history.push(getPath(`/mypage/service/asking`))}}
                , {label: '제재내역', onClick: ()=>{history.push(getPath(`/mypage/service/illegal`))}}
              ],
            }}/>
        </Window>
        {
          location.pathname!== '/mypage' &&(
            <div>
              <Route path={getPath(`/mypage/info`)} component={Info}/>
              <Route path={getPath(`/mypage/community`)} component={Community}/>
              <Route path={getPath(`/mypage/service`)} component={Service}/>
            </div>
          )
        }
      </HorizontalSlicedLayout>
    </div>
  );
};

export default quickConnect(MyPage);