import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import Input from "reactstrap/es/Input";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import Button from "@material-ui/core/Button";

class Asking extends Component {
  componentDidMount() {
    const {history}= this.props;
    this.unblock= history.block('작성한 내용이 모두 사라집니다');
  }
  componentWillUnmount() {
    this.unblock();
  }

  render() {
    return (
      <div>
        <PageTitle title={'1:1 문의하기'} explain={'새로운 문의를 작성합니다'}/>

        <Input
          type="text"
          placeholder="문의 제목을 입력하세요"
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
            console.log( { event, editor, data } );
          } }
        />

        <br/>
        <AlignLayout align={'right'}>
          <Button
            onClick={this.createComment}
            variant="contained"
            color="primary">
            작성
          </Button>
        </AlignLayout>
      </div>
    );
  }
}

export default Asking;