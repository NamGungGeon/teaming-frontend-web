import React, {Component} from 'react';
import PageTitle from "../primitive/PageTitle/PageTitle";
import {privacy} from "../utils/strings";

class Privacy extends Component {
  render() {
    return (
      <div>
        <PageTitle title={'개인정보처리방침'} explain={'티밍의 개인정보처리방침입니다'} align={'center'}/>
        <p>
          {privacy}
        </p>
      </div>
    );
  }
}

export default Privacy;