import React, {Component} from 'react';
import {authorized, randNum, randStr} from "../../utils/utils";
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
import {getPath} from "../../utils/url";
import {createTrash, getTrashes} from "../../http/tming";
import {errMsg, responseCode} from "../../http/util";

class Trash extends Component {
  state={
    input: '',
    trashes: [],
  };
  componentDidMount() {
    this.loadTrashes();
  }
  loadTrashes= async ()=>{
    const {auth, history, uiKit}= this.props;

    uiKit.loading.start();
    await getTrashes(auth).then(response=>{
      const {data}= response.data;

      if(!data || !data.length) {
        uiKit.toaster.cooking(
          (<div>
            아직 게시글이 없습니다
            <br/>
            첫 글의 주인공이 되어보세요!
          </div>));
        return;
      }
      console.log(data);
      this.setState({
        ...this.state,
        trashes: data.map(trash=>{
            return {
              user: "익명",
              content: trash.text,
              createdAt: trash.createdAt,
              comments: trash.replies,
              id: trash.id,
            }
          }
        )
      });
    }).catch(e=>{
      console.log(e);
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  }

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }

  throwThresh= ()=>{
    const {uiKit, auth}= this.props;
    if(!authorized(auth)){
      uiKit.toast.cooking('로그인이 필요한 기능입니다');
      return;
    }

    uiKit.popup.make((
      <div>
        <h4>배설</h4>
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
            onClick={async ()=>{
              //commit and close
              const {input}= this.state;

              uiKit.loading.start();
              //request commit
              await createTrash(auth, input).then(response=>{
                //reload
                this.loadTrashes();
                //ok, close!
                uiKit.toaster.cooking('쾌변!');
                uiKit.popup.destroy();
              }).catch(e=>{
                uiKit.toaster.cooking(errMsg(e));
              });
              uiKit.loading.end();
          }}>
            뒷처리
          </Button>
        </AlignLayout>
      </div>
    ));
  }
  render() {
    return (
      <div>
        <PageTitle title={'화장실'} explain={'뿌직....뿌직...뿌지직....'} align={'center'}/>
        <div>
          <AlignLayout
            align={'right'}>
            <Button color={'primary'} onClick={this.throwThresh}>
              배설
            </Button>
            &nbsp;&nbsp;
            <Button color={'info'} onClick={this.loadTrashes}>
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
      </div>
    );
  }
}

export default quickConnect(Trash);