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
import ButtonsWrapper from "../../primitive/ButtonsWrapper/ButtonsWrapper";
import TextField from "@material-ui/core/TextField";
import Window from "../../primitive/Window/Window";

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
        <Window title={'메뉴'} foldable>
          <AlignLayout align={'right'}>
            <TextField
              size={'small'}
              onChange={e=>{
                this.setState({
                  ...this.state,
                  filter: e.target.value,
                })
              }}
              color={'white'}
              label="카테고리 검색"
              variant="outlined" />
          </AlignLayout>
          <br/>
          <ButtonsWrapper
            buttons={
              gameList.map(game => {
                if(filter!== '' && !game.label.includes(filter))
                  return '';

                return (
                  <SquareButton
                    style={{
                      width: '100%'
                    }}
                    key={randStr(5)}
                    {...game}
                  />
                );
              })
            }/>
        </Window>
      </div>
    );
  }
}

export default Category;