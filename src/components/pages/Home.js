import React from 'react';
import AlignLayout from '../layouts/AlignLayout/AlignLayout';

import PageTitle from '../primitive/PageTitle/PageTitle';
import SquareButton from '../primitive/SquareButton/SquareButton';
import FlexLayout from '../layouts/FlexLayout/FlexLayout';
import { getPath } from '../utils/url';
import logo from '../resource/icon.png';
import people from '../resource/icon/people.png';
import UsefulInformation from "../containers/UsefulInformation/UsefulInformation";
import Logo from "../primitive/Logo/Logo";
import ButtonsWrapper from "../primitive/ButtonsWrapper/ButtonsWrapper";

export default function Home(props) {
  const go = path => {
    props.history.push(path);
  };

  return (
    <AlignLayout align="center">
      <Logo/>
      <UsefulInformation
        history={props.history}/>
      <br/>
      <ButtonsWrapper
        buttons={[
          (<SquareButton
              style={{backgroundColor: '#fc0474'}}
              onClick={() => {
                go(getPath(`/teambuild`));
              }}
              icon={people}
              label={'팀 매칭'}
            />),
          (<SquareButton
            style={{backgroundColor: '#2ab3fe'}}
            onClick={() => {
              go(getPath(`/chat`));
            }}
            icon={logo}
            label={'랜덤채팅'}
          />),
          (<SquareButton
            style={{backgroundColor: '#fc0474'}}
            icon={logo}
            label={'커뮤니티'}
            onClick={()=>{
              go(getPath(`/community`));
            }}
          />),
          (<SquareButton
            style={{backgroundColor: '#2ab3fe'}}
            icon={logo}
            onClick={()=>{
              go(getPath(`/trash`))
            }}
            label={'화장실'}
          />),
          (<SquareButton
              style={{backgroundColor: '#fc0474'}}
              icon={logo}
              label={'거래소'}
              onClick={()=>{
                go(getPath(`/trade`))
              }}
            />),
          (<SquareButton
              icon={logo}
              style={{backgroundColor: '#2ab3fe'}}
              label={'커플 매칭'}
              onClick={()=>{

              }}
            />)
        ]}
      />
    </AlignLayout>
  );
}
