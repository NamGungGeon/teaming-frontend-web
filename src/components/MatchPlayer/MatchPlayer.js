import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {kda} from "../../lib/cyphers-util";
import {thumbnailNoText} from "../../lib/res";
import styles from './MatchPlayer.module.css';
import classNames from 'classnames';
import moment from "moment";
import {quickConnect} from "../../redux";
import {getPath} from "../../lib/url";
import {convertToEN} from "../../lib/api";

class MatchPlayer extends Component {
    state= {
        nameEN: null,
    }

    componentDidMount() {
        const {player}= this.props;
        if(player){
            convertToEN(player.playInfo.characterName).then(response=>{
                console.log(response.data);
                this.setState({
                    ...this.state,
                    nameEN: response.data.nameEN,
                })
            }).catch(e=>{
                console.log(e);
            });
        }
    }

    render() {
        const {player, winner}= this.props;
        if(!player)
            return (<div></div>);

        const {playInfo}= player;
        const kdaText= kda(playInfo.killCount, playInfo.deathCount, playInfo.assistCount);
        return (
            <div
                className={classNames({[styles.win]: !!winner, [styles.lose]: true, 'clickable': true})}
                onClick={()=>{this.props.router.push(getPath(`/player/${player.nickname}`))}}>
                <h6>
                    #태그
                </h6>
                <Row>
                    <Col xs="8" className={styles.left}>
                        <img src={thumbnailNoText(this.state.nameEN)} alt="" className={styles.thumbnail}/>
                        <div>
                            <b>{player.nickname}</b>
                            <p style={{fontSize: '0.7rem', margin: 0}}>
                                {playInfo.characterName}&nbsp;({playInfo.level}레벨)<br/>
                                {playInfo.killCount}킬 {playInfo.deathCount}데스 {playInfo.assistCount}어시스트<br/>
                                KDA: {playInfo.deathCount== 0? 'Perfect!!': kdaText+ '점'}
                            </p>
                        </div>
                    </Col>
                    <Col xs="4">

                    </Col>
                </Row>
            </div>
        );
    }
}

export default quickConnect(MatchPlayer);