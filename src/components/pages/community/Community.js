import React, {Component} from 'react';
import {getPath} from "../../utils/url";
import Option from "../teambuild/lol/Option";
import Start from "../teambuild/lol/Start";
import Route from "react-router-dom/es/Route";
import Category from "./Category";
import Contents from "./Contents";
import Content from "./Content";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import HorizontalSlicedLayout from "../../layouts/HorizontalSlicedLayout/HorizontalSlicedLayout";

class Community extends Component {
  render() {
    return (
      <div>
        <PageTitle
          title={'커뮤니티'}
          explain={'마음껏 즐기세요!'}
          align={'center'}
        />
        <HorizontalSlicedLayout>
          <Route path={getPath(`/community/`)} component={Category}/>
          <Route exact path={getPath(`/community/:category`)} component={Contents}/>
        </HorizontalSlicedLayout>
      </div>
    );
  }
}

export default Community;