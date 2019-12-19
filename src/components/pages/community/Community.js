import React, {Component} from 'react';
import {getPath} from "../../utils/url";
import Option from "../teambuild/lol/Option";
import Start from "../teambuild/lol/Start";
import Route from "react-router-dom/es/Route";
import Contents from "./Contents";
import Content from "./Content";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import HorizontalSlicedLayout from "../../layouts/HorizontalSlicedLayout/HorizontalSlicedLayout";
import Window from "../../primitive/Window/Window";
import HorizontalNavigation from "../../containers/Navigation/HorizontalNavigation";
import {randNum} from "../../utils/utils";
import lol from "../../resource/icon/lol.jpg";
import overwatch from "../../resource/icon/overwatch.png";
import battleground from "../../resource/icon/battleground.png";
import CommunityCategory from "../../containers/CommunityCategory/CommunityCategory";
import Write from "./Write";

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
          <CommunityCategory
            history={this.props.history}/>
          <div>
            <Route exact path={getPath(`/community/write`)} component={Write}/>
            <Route exact path={getPath(`/community`)} component={Contents}/>
            <Route exact path={getPath(`/community/read/:id`)} component={Content}/>
          </div>
        </HorizontalSlicedLayout>
      </div>
    );
  }
}

export default Community;