import React, { Component } from 'react';

class Lab extends Component {
  state = {
    value: 1
  };

  componentDidMount() {
    let value = this.state.value;
    for (let l = 0; l < 100; l++) {
      value += 1;
    }
    this.setState({
      value
    });
  }

  render() {
    return (
      <div>
        <h4>코드 실험실</h4>
      </div>
    );
  }
}

export default Lab;
