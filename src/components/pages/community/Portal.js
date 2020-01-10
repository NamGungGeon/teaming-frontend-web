import React, {Component} from 'react';
import {getPath, urlQuery} from "../../utils/url";

class Portal extends Component {
  componentDidMount() {
    const {location, history}= this.props;
    const query= urlQuery(location);
    const category= query.category? query.category: 'general';

    history.replace(getPath(`/community?category=${category}`));
    console.log('hi');
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Portal;