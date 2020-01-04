import React, {Component} from 'react';
import PageTitle from "../../primitive/PageTitle/PageTitle";
import Section from "../../primitive/Section/Section";
import ButtonsWrapper from "../../primitive/ButtonsWrapper/ButtonsWrapper";
import SquareButton from "../../primitive/SquareButton/SquareButton";
import FAQ from "../../containers/FAQ/FAQ";
import {getPath} from "../../utils/url";
import CenterHome from "./CenterHome";
import {Route} from "react-router-dom";
import CreateCase from "./CreateCase";

class Center extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/center')} component={CenterHome}/>
        <Route exact path={getPath('/center/create')} component={CreateCase}/>
      </div>
    );
  }
}

export default Center;