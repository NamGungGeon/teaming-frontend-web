import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {InputGroupAddon} from "reactstrap";
import Button from "@material-ui/core/Button";
import Input from "reactstrap/es/Input";
import InputGroup from "reactstrap/es/InputGroup";

class Write extends Component {
  componentDidMount() {
    this.unblock= this.props.history.block('작성한 글이 모두 사라집니다');
  }

  componentWillUnmount() {
    this.unblock();
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          placeholder="글 제목을 입력하세요"
          onChange={e=>{
            this.setState({
              ...this.state,
            });
          }}/>
        <br/>
        <CKEditor
          editor={ ClassicEditor }
          data="<p>Hello from CKEditor 5!</p>"
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

export default Write;