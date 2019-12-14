import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import ImageView from "../../../primitive/ImageView/ImageView";

class MyInfo extends Component {
  render() {
    return (
      <div>
        <PageTitle title={'내 정보'} noMargin/>
        <br/>
        
        <ImageView/>
      </div>
    );
  }
}

export default MyInfo;