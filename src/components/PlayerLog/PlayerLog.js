import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {kda} from "../../lib/cyphers-util";
import {thumbnailNoText} from "../../lib/res";
import styles from './PlayerLog.module.css';
import classNames from 'classnames';
import moment from "moment";
import {quickConnect} from "../../redux";
import {getPath} from "../../lib/url";
import {convertToEN} from "../../lib/api";

class PlayerLog extends Component {
    state= {
        nameEN: null,
    }

    componentDidMount() {
        const {log}= this.props;
        if(log){
            convertToEN(log.playInfo.characterName).then(response=>{
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
        const {log}= this.props;
        if(!log)
            return (<div></div>);

        const {playInfo}= log;
        const kdaText= kda(playInfo.killCount, playInfo.deathCount, playInfo.assistCount);
        return (
            <div
                className={classNames({[styles.win]: playInfo.result=== 'win', [styles.lose]: true, 'clickable': true})}
                onClick={()=>{this.props.router.push(getPath(`/match/${log.matchId}`))}}>
                <h6>
                    [
                        {log.isRank? '공식': '일반'}/
                        {playInfo.partyUserCount? `${playInfo.partyUserCount}인파티`: '솔로'}/
                        {playInfo.result==='win'? '승리': '패배'}
                    ]
                    &nbsp;{log.date}
                </h6>
                <Row>
                    <Col xs="8" className={styles.left}>
                        <img src={thumbnailNoText(this.state.nameEN)} alt="" className={styles.thumbnail}/>
                        <div>
                            <b>{playInfo.characterName} ({playInfo.level}레벨)</b>
                            <p style={{fontSize: '0.7rem', margin: 0}}>
                                플레이타임: {parseInt(playInfo.playTime/60)}분 {playInfo.playTime%60}초<br/>
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

export default quickConnect(PlayerLog);