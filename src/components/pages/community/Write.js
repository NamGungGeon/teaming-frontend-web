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
import {createBoardPosts} from "../../http/tming";
import {errMsg} from "../../http/util";

class Write extends Component {
  state={
    title: '',
    body: '',

  }

  componentDidMount() {
    const {uiKit}= this.props;
    uiKit.destroyAll();

    this.unblock= this.props.history.block('작성한 글이 모두 사라집니다');
  }

  componentWillUnmount() {
    this.unblock();
  }

  createBoardPost= async ()=>{
    const {uiKit, location, auth, history}= this.props;
    const {title, body}= this.state;
    const query= urlQuery(location);

    const category= query.category? query.category: 'general';

    uiKit.loading.start();
    await createBoardPosts(auth, category, title, body).then(response=>{
      //ok!
      uiKit.toaster.cooking('작성 완료!');
      this.unblock();
      history.push(`/community?category=${category}`);
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    })
    uiKit.loading.end();
  }

  render() {
    return (
      <div>
        <PageTitle
          title={'글 작성'}
          explain={'커뮤니티에 글을 작성합니다'}/>
        <br/>
        <Input
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
            console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            this.setState({
              ...this.state,
              body: data,
            });
            //console.log(data);
          } }
        />

        <br/>
        <AlignLayout align={'right'}>
          <Button
            onClick={this.createBoardPost}
            variant="contained"
            color="primary">
            작성
          </Button>
        </AlignLayout>
      </div>
    );
  }
}

export default quickConnect(Write);