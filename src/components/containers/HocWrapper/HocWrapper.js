import React, {Component} from 'react';
import {quickConnect} from "../../../redux/quick";
import {UiBundle} from "../../hoc";

class HocWrapper extends Component {
  state={};

  componentDidMount() {
    const {UIKitDispatcher}= this.props;
    UIKitDispatcher.init(UiBundle(this));
  }


  render() {
    const {uiKit}= this.props;

    return (
      <div>
        {
          uiKit && uiKit.render()
        }
      </div>
    );
  }
}

export default quickConnect(HocWrapper);