import React, {Component} from 'react';

class UserInfoViewer extends Component {
  state={
    user: null
  };

  render() {
    const {id}= this.props;
    return (
      <div>
        <h5>{id}의 정보</h5>
      </div>
    );
  }
}

export default UserInfoViewer;