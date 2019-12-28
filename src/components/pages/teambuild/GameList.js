import React, { Component } from 'react';
import SquareButton from '../../primitive/SquareButton/SquareButton';
import { getPath } from '../../utils/url';
import PageTitle from '../../primitive/PageTitle/PageTitle';

import lol from '../../resource/icon/lol.jpg';
import overwatch from '../../resource/icon/overwatch.png';
import battleground from '../../resource/icon/battleground.png';
import {randStr} from "../../utils/utils";
import {Input} from "reactstrap";
import FormGroup from "reactstrap/es/FormGroup";
import Col from "reactstrap/es/Col";
import CardWrapper from "../../primitive/CardWrapper/CardWrapper";

class GameList extends Component {
  state = {
    gameList: [
      {
        label: '리그 오브 레전드',
        icon: lol,
        onClick: () => {
          this.go(getPath(`/teambuild/lol`));
        }
      },
      {
        label: '오버워치',
        icon: overwatch
      },
      {
        label: '배틀그라운드',
        icon: battleground
      }
    ],
    filter: '',
  };

  componentDidMount() {
    this.props.stepping(0);
    window.scrollTo(0,0);
  }

  go = path => {
    this.props.history.push(path);
  };

  render() {
    const { gameList, filter } = this.state;
    return (
      <div>
        <PageTitle
          title={'팀 매칭'}
          explain={'팀 매칭이 필요한 게임을 선택하세요'}
          align={'left'}
        />
        <FormGroup row>
          <Col sm={4}>
            <Input
              className={'transparent'}
              onChange={e=>{
                this.setState({
                  ...this.state,
                  filter: e.target.value,
                })
              }}
              placeholder="게임 검색"/>
          </Col>
          <Col sm={8}/>
        </FormGroup>

        <br/>

        <CardWrapper>
          {gameList.map(game => {
            if(filter!== '' && !game.label.includes(filter))
              return '';

            return (
              <div key={randStr(5)}>
                <SquareButton
                  {...game}
                />
                <br />
              </div>
            );
          })}
        </CardWrapper>
      </div>
    );
  }
}

export default GameList;
