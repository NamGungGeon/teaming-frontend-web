import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import CardWrapper from '../../../primitive/CardWrapper/CardWrapper';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { quickConnect } from '../../../../redux/quick';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { getBlocks, removeBlock } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import CloseIcon from '@material-ui/icons/Close';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import { beautifyDate } from '../../../../utils/utils';

class Blocks extends Component {
  state = {
    blocks: null
  };

  componentDidMount() {
    this.loadBlocks();
  }

  loadBlocks = async () => {
    const { uiKit, auth } = this.props;

    uiKit.loading.start();
    await getBlocks(auth)
      .then(response => {
        const { data } = response.data;
        console.log(data);
        this.setState({
          ...this.state,
          blocks: data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  removeBlock = async id => {
    const { auth, uiKit } = this.props;

    uiKit.popup.make(
      <div>
        <h5>선택한 유저를 차단 해제하시겠습니까?</h5>
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={async () => {
              uiKit.loading.start();
              await removeBlock(auth, id)
                .then(response => {
                  console.log(response);
                  //ok
                  uiKit.toaster.cooking('차단이 해제되었습니다');
                  uiKit.toaster.popup.destroy();
                  this.loadBlocks();
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();
            }}
            variant={'contained'}
            color={'primary'}
          >
            차단해제
          </Button>
          &nbsp;&nbsp;
          <Button
            onClick={() => {
              uiKit.popup.destroy();
            }}
            variant={'contained'}
            color={'secondary'}
          >
            닫기
          </Button>
        </AlignLayout>
      </div>
    );
  };

  render() {
    const { blocks } = this.state;

    return (
      <div>
        <PageTitle align={'left'} title={'차단목록'} explain={'악질쳐내!!!'} />
        <br />
        <CardWrapper>
          {blocks && blocks.length === 0 && <p>차단한 유저가 없습니다</p>}
          {blocks &&
            blocks.map(data => {
              const { block } = data;
              return (
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <CloseIcon />
                      </Avatar>
                    }
                    title={block.username}
                    subheader={beautifyDate(data.createdAt) + '에 차단'}
                  />
                  <CardActions
                    style={{
                      flexDirection: 'row-reverse'
                    }}
                    disableSpacing
                  >
                    <Tooltip title={'차단해제'}>
                      <IconButton
                        onClick={() => {
                          this.removeBlock(data.id);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              );
            })}
        </CardWrapper>
      </div>
    );
  }
}

export default quickConnect(Blocks);
