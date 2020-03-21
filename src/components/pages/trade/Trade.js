import React, { Component } from 'react';
import Category from './Category';
import { Route } from 'react-router-dom';
import ItemList from './ItemList';

class Trade extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    //dev...
    alert('준비중인 기능입니다');
    this.props.history.replace('/');
  }

  render() {
    return (
      <div>
        <Route exact path={`/trade`} component={Category} />
        <Route exact path={`/trade/:game`} component={ItemList} />
        <Route exact path={`/trade/:game/read/:id`} component={ItemList} />
        <Route exact path={`/trade/:game/write`} component={ItemList} />
      </div>
    );
  }
}

export default Trade;
