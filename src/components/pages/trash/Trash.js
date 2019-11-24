import React, {Component} from 'react';
import {randNum, randStr} from "../../utils/utils";
import Threadic from "../../primitive/Threadic/Threadic";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import HorizontalSlicedLayout from "../../layouts/HorizontalSlicedLayout/HorizontalSlicedLayout";
import Window from "../../primitive/Window/Window";
import SquareButton from "../../primitive/SquareButton/SquareButton";
import icon from '../../resource/icon.png';
import Button from "reactstrap/es/Button";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {quickConnect} from "../../redux";
import Input from "reactstrap/es/Input";

class Trash extends Component {
  state={
    input: '',
    trashes: [
      {user: `익명 (${randNum(999)}.${randNum(999)})`, content: '똥 먹기 vs 백만원 받기 뭐고름?', comments: ['패드립마렵네', '닥전이지 ㅋㅋ']},
      {user: `익명 (${randNum(999)}.${randNum(999)})`, content: '장지환 코만지고싶다', comments: ['나도', 'ㄹㅇ ㅋㅋ']},
    ],
  };

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }

  throwThresh= ()=>{
    const {uiKit}= this.props;
    uiKit.popup.make((
      <div>
        <h4>쓰레기 무단투기</h4>
        <br/>
        <Input
          className={'transparent'}
          type={'textarea'}
          style={{height: '300px'}}
          onChange={e=>{
            this.setState({
              ...this.state,
              input: e.target.value,
            })
          }}
          placeholder={'내용을 입력하세요'}/>
        <br/>
        <AlignLayout align={'right'}>
          <Button
            color={'primary'}
            onClick={()=>{
              //commit and close
              const {input, trashes}= this.state;

              //request commit
              trashes.push({
                user: `익명 (${randNum(999)}.${randNum(999)})`,
                content: input,
                comments: [],
              });
              this.setState({
                ...this.state,
                input: '',
                trashes,
              });

              //ok, close!
              uiKit.toaster.cooking('작성 완료');
              uiKit.popup.destroy();
          }}>
            버리기
          </Button>
        </AlignLayout>
      </div>
    ));
  }
  render() {
    return (
      <div>
        <PageTitle title={'감정 쓰레기통'} explain={'위이잉~ (파리날라다니는소리)'} align={'center'}/>
        <HorizontalSlicedLayout>
          <Window title={'핫토픽'} foldable>
            {
              this.state.trashes.map(trash=>{
                return (<Threadic {...trash}/>)
              })
            }
          </Window>
          <div>
            <AlignLayout align={'right'}>
              <Button size={'sm'} color={'primary'} onClick={this.throwThresh}>
                쓰레기 무단투기
              </Button>
              &nbsp;&nbsp;
              <Button size={'sm'} color={'info'}>
                새로고침
              </Button>
            </AlignLayout>
            <br/>
            {
              this.state.trashes.map(trash=>{
                return (<Threadic {...trash}/>)
              })
            }
          </div>
        </HorizontalSlicedLayout>
      </div>
    );
  }
}

export default quickConnect(Trash);