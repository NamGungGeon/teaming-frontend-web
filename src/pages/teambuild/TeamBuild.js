import React, {Component} from 'react';
import SquareButton from "../../components/SquareButton/SquareButton";
import {getPath} from "../../lib/url";
import GameList from "./GameList";
import {Route} from "react-router-dom";
import Lol from "./Lol";
import Builder from "./Builder";

class TeamBuild extends Component {
    render() {
        const {url}= this.props.match;
        console.log(url);
        return (
            <div>
                <Route exact path={getPath(`${url}`)} component={GameList}/>

                <Route exact path={getPath(`${url}/lol`)} component={Lol}/>
                <Route exact path={getPath(`${url}/lol/build`)} component={Builder}/>
            </div>
        );
    }
}

export default TeamBuild;