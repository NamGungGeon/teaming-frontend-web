import React, {Component} from 'react';
import PageTitle from "../primitive/PageTitle/PageTitle";
import {privacy} from "../../utils/strings";
import {pageDescription} from "../../utils/utils";

class Privacy extends Component {
  componentDidMount() {
    pageDescription("티밍: 개인정보처리방침", "개인정보처리방침");
    window.scrollTo(0,0);
  }
  componentWillUnmount() {
    pageDescription();
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