import React, {Component} from 'react';
import {quickConnect} from "../../../redux/quick";
import HorizontalNavigation from "../../containers/Navigation/HorizontalNavigation";
import {getPath} from "../../../utils/url";
import {Route} from "react-router-dom";
import Characters from "./Characters";

class Cyphers extends Component {
  componentDidMount() {
    const {history}= this.props;
    const nav={
      '공략 및 분석': [
        {
          label: '캐릭터',
          onClick: ()=>{
            history.push('/cyphers/characters');
          }
        }
      ]
    };
    this.props.SideNavDispatcher.set(nav);
  }

  componentWillUnmount() {
    this.props.SideNavDispatcher.remove();
  }

  render() {
    return (
      <div>
        <Route exact path={getPath('/cyphers/characters')} component={Characters}/>
      </div>
    );
  }
}

export default quickConnect(Cyphers);