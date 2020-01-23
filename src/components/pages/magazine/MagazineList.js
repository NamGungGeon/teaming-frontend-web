import React, {Component} from 'react';
import PageTitle from "../../primitive/PageTitle/PageTitle";
import Magazine from "../../containers/Magazine/Magazine";
import Section from "../../primitive/Section/Section";

class MagazineList extends Component {
  render() {
    return (
      <div>
        <PageTitle title={'매거진'} explain={'주요 정보를 빠르고 쉽게 받아보세요'}/>
        <br/>
        <Section>
          <Magazine/>
        </Section>
      </div>
    );
  }
}

export default MagazineList;