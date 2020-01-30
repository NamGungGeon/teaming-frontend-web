import React, { Component } from 'react';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import Input from 'reactstrap/es/Input';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../../redux/quick';
import { urlQuery } from '../../../utils/url';
import { getBoardPost, updateBoardPost } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import Optional from '../../primitive/Optional/Optional';
import Wysiwyg from '../../primitive/WYSIWYG/WYSIWYG';

class Update extends Component {
  state = {
    title: '',
    body: '',
    ready: false,
    code: ''
  };

  componentDidMount() {
    const { uiKit } = this.props;
    uiKit.destroyAll();

    this.unblock = this.props.history.block('글 수정 내역이 취소됩니다');
    this.loadPost();
  }

  loadPost = async () => {
    const { uiKit, match } = this.props;
    if (!match.params.id) {
      uiKit.toaster.cooking('비정상적인 접근입니다');
      return;
    }

    uiKit.loading.start();
    await getBoardPost(match.params.id)
      .then(response => {
        const { data } = response;
        this.setState({
          ...this.state,
          title: data.title,
          body: data.body,
          ready: true
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  componentWillUnmount() {
    this.unblock();
  }

  updateBoardPost = async () => {
    const { uiKit, location, match, auth, history } = this.props;
    const { title, code } = this.state;
    const query = urlQuery(location);

    const category = query.category ? query.category : 'general';
    const data = this.editor.getBody();

    uiKit.loading.start();
    await updateBoardPost(
      auth,
      match.params.id,
      category,
      title,
      data.body,
      code,
      data.media
    )
      .then(response => {
        //ok!
        uiKit.toaster.cooking('수정 완료!');
        this.unblock();
        history.push(`/community?category=${category}`);
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });

    uiKit.loading.end();
  };

  render() {
    const { location } = this.props;
    const { title, body, ready } = this.state;
    const { category } = urlQuery(location);

    if (!ready) return <div />;

    return (
      <div>
        <PageTitle
          title={'글 수정'}
          explain={'작성한 글을 수정하여 업로드합니다'}
        />
        <br />
        <Optional visible={category === 'anonymous'}>
          <Input
            type="password"
            placeholder="작성 시 입력했던 코드를 입력하세요"
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
          value={title}
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
        <Wysiwyg body={body} ref={ref => (this.editor = ref)} />
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={this.updateBoardPost}
            variant="contained"
            color="primary"
          >
            수정
          </Button>
        </AlignLayout>
      </div>
    );
  }
}

export default quickConnect(Update);
