import React, { Component } from 'react';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import Input from 'reactstrap/es/Input';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../../redux/quick';
import { urlQuery } from '../../../utils/url';
import { createBoardPosts } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import Optional from '../../primitive/Optional/Optional';
import Wysiwyg from '../../primitive/WYSIWYG/WYSIWYG';
import { authorized } from '../../../utils/utils';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      code: ''
    };
  }

  componentDidMount() {
    const { uiKit, auth, location, history } = this.props;
    const { category } = urlQuery(location);
    if (!authorized(auth) && category !== 'anonymous') {
      uiKit.toaster.cooking('익명 게시판이 아니면 로그인이 필요합니다');
      history.goBack();
      return;
    }

    uiKit.destroyAll();
    this.unblock = this.props.history.block('작성한 글이 모두 사라집니다');
  }

  componentWillUnmount() {
    if (this.unblock) this.unblock();
  }

  createBoardPost = async () => {
    const { uiKit, location, auth, history } = this.props;
    const { title, code } = this.state;
    const query = urlQuery(location);

    const category = query.category ? query.category : 'general';

    const data = this.wysiwyg.getBody();

    //경고 추가 필요
    uiKit.popup.make(
      <div>
        <h4>경고</h4>
        <br />
        <p>
          타인에게 불쾌감을 줄 수 있는 내용이 포함되어 있을 경우 관리자의 재량에
          따라 게시글이 삭제될 수 있습니다.
          <br />
          또한 법적으로 불법인 컨텐츠 (음란물, 도박 등)을 업로드 시 관계 법령에
          의거 처벌 받을 수 있습니다
        </p>
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={async () => {
              uiKit.loading.start();

              await createBoardPosts(
                auth,
                category,
                title,
                data.body,
                code,
                data.media
              )
                .then(response => {
                  //ok!
                  uiKit.popup.destroy();
                  uiKit.toaster.cooking('작성 완료!');
                  this.unblock();
                  history.goBack();
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });

              uiKit.loading.end();
            }}
            variant={'contained'}
            color={'primary'}
          >
            동의합니다
          </Button>
        </AlignLayout>
      </div>
    );
  };

  render() {
    const { location } = this.props;
    const { category } = urlQuery(location);

    return (
      <div>
        <PageTitle title={'글 작성'} explain={'커뮤니티에 글을 작성합니다'} />
        <br />
        <Optional visible={category === 'anonymous'}>
          <Input
            type="password"
            placeholder="삭제/수정에 사용할 비밀번호를 입력하세요"
            onChange={e => {
              this.setState({
                ...this.state,
                code: e.target.value
              });
            }}
          />
          <br />
        </Optional>
        <Input
          type="text"
          placeholder="글 제목을 입력하세요"
          onChange={e => {
            this.setState({
              ...this.state,
              title: e.target.value
            });
          }}
        />
        <br />
        <Wysiwyg ref={ref => (this.wysiwyg = ref)} />
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={this.createBoardPost}
            variant="contained"
            color="primary"
          >
            작성
          </Button>
        </AlignLayout>
      </div>
    );
  }
}

export default quickConnect(Write);
