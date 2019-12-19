import React, { Component } from 'react';
import SquareButton from '../../primitive/SquareButton/SquareButton';
import { getPath } from '../../utils/url';
import Popcorn from '../../primitive/Popcorn/Popcorn';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

import {randStr} from "../../utils/utils";
import FlexLayout from "../../layouts/FlexLayout/FlexLayout";
import FormGroup from "reactstrap/es/FormGroup";
import Col from "reactstrap/es/Col";
import {Input} from "reactstrap";

class Category extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }

  state = {
    gameList: [
      {
        label: '사이퍼즈',
        icon: require('../../resource/icon/cyphers.png'),
        onClick: () => {
          this.go(getPath(`/trade/cyphers`));
        }
      },
      {
        label: '메이플스토리',
        icon: require('../../resource/icon/maplestory.png'),
        onClick: () => {
          this.go(getPath(`/trade/maple`));
        }
      },
      {
        label: '던전앤파이터',
        icon: require('../../resource/icon/dnf.png'),
        onClick: () => {
          this.go(getPath(`/trade/dnf`));
        }
      },
    ],
    filter: '',
  };

  go = path => {
    this.props.history.push(path);
  };
  render() {
    const { gameList, filter } = this.state;
    return (
      <div>
        <AlignLayout align={'center'}>
          <PageTitle
            title={'거래소'}
            explain={'아이템을 거래할 게임을 선택하세요'}
            align={'center'}
          />
        </AlignLayout>

        <AlignLayout align={'right'}>
          <FormGroup row>
            <Col sm={8}/>
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
          </FormGroup>
        </AlignLayout>
        <FlexLayout responsive margin={16}>
          {gameList.map((game, idx) => {
            if(filter!== '' && !game.label.includes(filter))
              return '';
            return (
              <div key={randStr(5)}>
                <SquareButton
                  style={{
                    animationDelay: `${0.1*idx}s`,
                  }}
                  enableAnimation
                  {...game}
                />
                <br />
              </div>
            );
          })}
        </FlexLayout>
      </div>
    );
  }
}

export default Category;
