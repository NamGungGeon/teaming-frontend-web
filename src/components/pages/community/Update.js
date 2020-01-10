import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {InputGroupAddon} from "reactstrap";
import Button from "@material-ui/core/Button";
import Input from "reactstrap/es/Input";
import InputGroup from "reactstrap/es/InputGroup";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import {quickConnect} from "../../redux";
import {urlQuery} from "../../utils/url";
import {createBoardPosts, getBoardPost, updateBoardPost} from "../../http/tming";
import {errMsg} from "../../http/util";
import Optional from "../../primitive/Optional/Optional";

class Update extends Component {
  state={
    title: '',
    body: '',
    ready: false,
    code: '',
  }

  componentDidMount() {
    const {uiKit}= this.props;
    uiKit.destroyAll();

    this.unblock= this.props.history.block('글 수정 내역이 취소됩니다');
    this.loadPost();
  }

  loadPost= async ()=>{
    const {uiKit, match}= this.props;
    if(!match.params.id){
      uiKit.toaster.cooking('비정상적인 접근입니다');
      return;
    }

    uiKit.loading.start();
    await getBoardPost(match.params.id).then(response=>{
      const {data}= response;
      this.setState({
        ...this.state,
        title: data.title,
        body: data.body,
        ready: true,
      });

    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  componentWillUnmount() {
    this.unblock();
  }

  updateBoardPost= async ()=>{
    const {uiKit, location, match, auth, history}= this.props;
    const {title, body, code}= this.state;
    const query= urlQuery(location);

    const category= query.category? query.category: 'general';

    uiKit.loading.start();
    await updateBoardPost(auth, match.params.id, category, title, body, code).then(response=>{
      //ok!
      uiKit.toaster.cooking('수정 완료!');
      this.unblock();
      history.push(`/community?category=${category}`);
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });

    uiKit.loading.end();
  };

  render() {
    const {location}= this.props;
    const {title, body, ready}= this.state;
    const {category}= urlQuery(location);

    if(!ready) return (<div/>);

    return (
      <div>
        <PageTitle
          title={'글 수정'}
          explain={'작성한 글을 수정하여 업로드합니다'}/>
        <br/>
        <Optional
          visible={category=== 'anonymous'}>
          <Input
            type="password"
            placeholder="작성 시 입력했던 코드를 입력하세요"
            onChange={e=>{
              this.setState({
                ...this.state,
                code: e.target.value,
              });
            }}/>
          <br/>
        </Optional>
        <Input
          value={title}
          type="text"
          placeholder="글 제목을 입력하세요"
          onChange={e=>{
            this.setState({
              ...this.state,
              title: e.target.value,
            });
          }}/>
        <br/>
        <CKEditor
          editor={ ClassicEditor }
          onInit={ editor => {
            // You can store the "editor" and use when it is needed.
            editor.setData(body);
            console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            this.setState({
              ...this.state,
              body: data,
            });
            console.log(data);
          } }
        />

        <br/>
        <AlignLayout align={'right'}>
          <Button
            onClick={this.updateBoardPost}
            variant="contained"
            color="primary">
            수정
          </Button>
        </AlignLayout>
      </div>
    );
  }
}

export default quickConnect(Update);