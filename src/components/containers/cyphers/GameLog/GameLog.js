import React from 'react';
import getHistory from 'react-router-global-history';
import ImageView from '../../../primitive/ImageView/ImageView';
import { cyphersResource, openApiRes } from '../../../../http/cyphers';
import styles from './GameLog.module.css';
import classNames from 'classnames';
import { formatToMoney } from '../../../../utils/formatter';
import AttributeCombination from '../AttributeCombination/AttributeCombination';

// 0:
// date: "2020-03-20 18:49"
// matchId: "a4ddf6f7a4972c867b9f096ca06071df24ce0491092e305765edb4b673246195"
// map:
//   mapId: 102
// name: "메트로폴리스"
// __proto__: Object
// playInfo:
//   result: "win"
// random: false
// partyUserCount: 0
// characterId: "bdeafa2ce23cc0d6d301200b1ce5bca9"
// characterName: "레나"
// level: 48
// killCount: 5
// deathCount: 4
// assistCount: 15
// attackPoint: 31946
// damagePoint: 34482
// battlePoint: 318
// sightPoint: 420
// playTime: 912
// __proto__: Object
// position:
//   name: "탱커"
// explain: "체력 +7%, 회피 +5%"
// attribute: Array(3)
// 0:
// level: 1
// id: "ce65e78d295a624270d418ebafa8d1c0"
// name: "기민한 몸놀림"
// __proto__: Object
// 1: {level: 2, id: "1d49c4504c55a43f670d4d69575760d4", name: "재생의 숨결"}
// 2: {level: 3, id: "678bca255e575ae96aceefacaa7aee4e", name: "최후의 저항"}
// length: 3
// __proto__: Array(0)
// __proto__: Object
// __proto__: Object
const GameLog = ({ game }) => {
  const history = getHistory();
  const { map, playInfo, position } = game;
  const getKDA = (k, d, a) => {
    const { killCount, deathCount, assistCount } = playInfo;

    if (deathCount === 0) return killCount + assistCount;
    return (killCount + assistCount) / deathCount;
  };
  const partyType = () => {
    const { partyUserCount } = playInfo;
    return partyUserCount ? `${partyUserCount}인` : '솔로';
  };
  const gameType = () => {
    const { gameTypeId } = game;
    return gameTypeId === 'normal' ? '일반' : '공식';
  };
  const gameResult = () => {
    const { result } = playInfo;
    return result === 'win' ? '승리' : '패배';
  };
  return (
    <div
      className={classNames(
        styles.wrapper,
        playInfo.result === 'win' ? styles.winner : styles.loser
      )}
    >
      {/*header*/}
      <h4 className={styles.header}>
        [{game.date}] {gameType()}/{gameResult()}/{partyType()}
      </h4>
      {/*content*/}
      <div className={styles.content}>
        <ImageView
          onClick={() => {
            history.push(
              `/cyphers/characters?nameKR=${playInfo.characterName}`
            );
          }}
          style={{
            width: '84px',
            height: '84px'
          }}
          shape={'circle'}
          img={openApiRes.getCharacterIcon(playInfo.characterId)}
        />
        <div>
          <h4>
            {playInfo.characterName} ({playInfo.level}레벨)
          </h4>
          <p className={'explain'}>
            플레이타임: {playInfo.playTime % 60}분{' '}
            {parseInt(playInfo.playTime / 60)}초
            <br />
            {playInfo.killCount}킬 {playInfo.deathCount}데스{' '}
            {playInfo.assistCount}어시
            <br />
            KDA: {getKDA().toFixed(2)}점
          </p>
        </div>
        <div className={styles.scores}>
          <div>
            입힌 피해량: {formatToMoney(playInfo.attackPoint)}
            <br />
            입은 피해량: {formatToMoney(playInfo.damagePoint)}
            <br />
            시야: {formatToMoney(playInfo.sightPoint)}
            <br />
            전투참여: {formatToMoney(playInfo.battlePoint)}
          </div>
          <div className={classNames('desktop', styles.attributes)}>
            <AttributeCombination
              positionName={position.name}
              explain={position.explain}
              attributes={position.attribute.map(attr => attr.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLog;
