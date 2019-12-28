import React, {Component} from 'react';
import PageTitle from "../primitive/PageTitle/PageTitle";
import {privacy} from "../utils/strings";

class Privacy extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <PageTitle title={'개인정보처리방침'} explain={'티밍의 개인정보처리방침입니다'} align={'left'}/>
        <br/>
        <p>
          {privacy}
        </p>
      </div>
    );
  }
}

export default Privacy;