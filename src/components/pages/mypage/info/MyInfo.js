import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";

class MyInfo extends Component {
  render() {
    return (
      <div>
        <PageTitle title={'내 정보'} noMargin/>
      </div>
    );
  }
}

export default MyInfo;