import React, { Component } from 'react';
import Threadic from '../../primitive/Threadic/Threadic';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { quickConnect } from '../../../redux/quick';
import Input from 'reactstrap/es/Input';
import { createTrash, getTrashes } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import Button from '@material-ui/core/Button';
import { FaToiletPaper } from 'react-icons/fa';
import RefreshIcon from '@material-ui/icons/Refresh';

class Trash extends Component {
  state = {
    password: '',
    input: '',
    trashes: []
  };
  componentDidMount() {
    this.loadTrashes();
  }
  loadTrashes = async () => {
    const { uiKit } = this.props;

    uiKit.loading.start();
    await getTrashes()
      .then(response => {
        const { data } = response.data;

        if (!data || !data.length) {
          uiKit.toaster.cooking(
            <div>
              아직 게시글이 없습니다
              <br />첫 글의 주인공이 되어보세요!
            </div>
          );
          return;
        }
        console.log(data);
        this.setState({
          ...this.state,
          trashes: data.map(trash => {
            return {
              user: '익명',
              content: trash.text,
              createdAt: trash.createdAt,
              comments: trash.replies,
              id: trash.id,
              replies: trash.replies
            };
          })
        });
      })
      .catch(e => {
        console.log(e);
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }

  throwThresh = () => {
    const { uiKit } = this.props;

    uiKit.popup.make(
      <div>
        <h4>배설</h4>
        <br />
        <Input
          className={'transparent'}
          type={'password'}
          onChange={e => {
            this.setState({
              ...this.state,
              password: e.target.value
            });
          }}
          placeholder={'수정/삭제에 사용할 비밀번호를 입력하세요'}
        />
        <br />
        <Input
          className={'transparent'}
          type={'textarea'}
          style={{ height: '300px' }}
          onChange={e => {
            this.setState({
              ...this.state,
              input: e.target.value
            });
          }}
          placeholder={'내용을 입력하세요'}
        />
        <br />
        <AlignLayout align={'right'}>
          <Button
            startIcon={<FaToiletPaper />}
            variant={'contained'}
            color={'primary'}
            onClick={async () => {
              //commit and close
              const { input, password } = this.state;
              uiKit.loading.start();
              //request commit
              await createTrash(password, input)
                .then(response => {
                  //reload
                  this.loadTrashes();
                  //ok, close!
                  uiKit.toaster.cooking('쾌변!');
                  uiKit.popup.destroy();
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();
            }}
          >
            뒷처리
          </Button>
        </AlignLayout>
      </div>
    );
  };

  render() {
    return (
      <div>
        <PageTitle
          title={'화장실'}
          explain={'뿌직....뿌직...뿌지직....'}
          align={'left'}
        />
        <br />
        <div>
          <AlignLayout align={'left'}>
            <Button
              startIcon={<FaToiletPaper />}
              variant={'contained'}
              color={'primary'}
              onClick={this.throwThresh}
            >
              배설
            </Button>
            &nbsp;&nbsp;
            <Button
              startIcon={<RefreshIcon />}
              variant={'contained'}
              color={'secondary'}
              onClick={this.loadTrashes}
            >
              새로고침
            </Button>
          </AlignLayout>
          <br />
          {this.state.trashes.map((trash, idx) => {
            return <Threadic {...trash} key={trash.createdAt} />;
          })}
        </div>
      </div>
    );
  }
}

export default quickConnect(Trash);
