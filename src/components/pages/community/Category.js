import React, {Component} from 'react';
import lol from "../../resource/icon/lol.jpg";
import {getPath} from "../../utils/url";
import overwatch from "../../resource/icon/overwatch.png";
import battleground from "../../resource/icon/battleground.png";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import FormGroup from "reactstrap/es/FormGroup";
import Col from "reactstrap/es/Col";
import {Input} from "reactstrap";
import Popcorn from "../../primitive/Popcorn/Popcorn";
import FlexLayout from "../../layouts/FlexLayout/FlexLayout";
import {randStr} from "../../utils/utils";
import SquareButton from "../../primitive/SquareButton/SquareButton";

class Category extends Component {
  state = {
    gameList: [
      {
        label: '자유게시판',
        onClick: () => {
          this.go(getPath(`/community/freedom`));
        }
      },
      {
        label: '익명게시판',
        onClick: () => {
          this.go(getPath(`/community/anonymous`));
        }
      },
      {
        label: '리그 오브 레전드',
        icon: lol,
        onClick: () => {
          this.go(getPath(`/community/lol`));
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

  go = path => {
    this.props.history.push(path);
  };
  render() {
    const { gameList, filter } = this.state;
    return (
      <div>
        <PageTitle
          title={'커뮤니티'}
          explain={'마음껏 즐기세요!'}
          align={'center'}
        />
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
                placeholder="카테고리 검색"/>
            </Col>
          </FormGroup>
        </AlignLayout>
        <Popcorn>
          <FlexLayout responsive margin={16}>
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
          </FlexLayout>
        </Popcorn>
      </div>
    );
  }
}

export default Category;