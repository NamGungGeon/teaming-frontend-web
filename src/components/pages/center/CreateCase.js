import React, {Component} from 'react';
import PageTitle from "../../primitive/PageTitle/PageTitle";

class CreateCase extends Component {
  render() {
    return (
      <div>
        <PageTitle title={'문의 작성'} explain={'최대한 자세하게 문제를 묘사해 주세요'}/>
        <br/><br/>
      </div>
    );
  }
}

export default CreateCase;