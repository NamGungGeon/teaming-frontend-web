import React, {Component} from 'react';
import {getPath} from "../../utils/url";
import Category from "./Category";
import {Route} from "react-router-dom";
import ItemList from "./ItemList";

class Trade extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <Route exact path={getPath(`/trade`)} component={Category}/>
        <Route exact path={getPath(`/trade/:game`)} component={ItemList}/>
        <Route exact path={getPath(`/trade/:game/read/:id`)} component={ItemList}/>
        <Route exact path={getPath(`/trade/:game/write`)} component={ItemList}/>
      </div>
    );
  }
}

export default Trade;