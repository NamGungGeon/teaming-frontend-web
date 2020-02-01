import React, {Component} from 'react';
import PageTitle from "../../primitive/PageTitle/PageTitle";
import RecommendYoutube from "../../containers/RecommendYoutube/RecommendYoutube";
import Section from "../../primitive/Section/Section";
import {pageDescription} from "../../../utils/utils";

class YoutuberList extends Component {
  componentDidMount() {
    pageDescription("티밍: 유튜브 홍보 게시판", "자신의 끼를 발산해보세요");
  }
  componentWillUnmount() {
    pageDescription();
  }

  render() {
    return (
      <div>
        <PageTitle
          title={'유튜브 홍보 게시판'}
          explain={'유튜버라면 자신의 끼를 표현해 보세요'}/>
        <br/>
        <Section>
          <RecommendYoutube/>
        </Section>
      </div>
    );
  }
}

export default YoutuberList;