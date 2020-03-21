import React, { useEffect, useState } from 'react';
import { quickConnect } from '../../../../redux/quick';
import Section from '../../../primitive/Section/Section';
import {
  getPlayerId,
  getPlayerInfo,
  getPlayerLog
} from '../../../../http/cyphers';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import Tabs from '../../../primitive/Tabs/Tabs/Tabs';
import GameLog from '../GameLog/GameLog';

const PlayerLog = ({ uiKit, nickname, onFail }) => {
  const [playerId, setPlayerId] = useState();
  const [playerInfo, setPlayerInfo] = useState();
  const [games, setGames] = useState([]);
  //get playerId
  useEffect(() => {
    setPlayerInfo(null);
    setGames([]);

    (async () => {
      uiKit.loading.start();
      await getPlayerId(nickname)
        .then(response => {
          console.log(nickname, response.data);
          setPlayerId(response.data.player.playerId);
        })
        .catch(e => {
          onFail(e);
        });
      uiKit.loading.end();
    })();

    return () => {
      uiKit.destroyAll();
    };
  }, [nickname]);
  useEffect(() => {
    if (playerId) {
      //get PlayerInfo
      // playerInfo
      // playerId: "a915135a9e50807f8cb4e4847671ec06"
      // nickname: "등차수열"
      // grade: 71
      // clanName: "모범"
      // ratingPoint: null
      // maxRatingPoint: null
      // tierName: null
      getPlayerInfo(playerId)
        .then(response => {
          console.log(nickname, response.data);
          setPlayerInfo(response.data);
        })
        .catch(e => {
          console.log(e);
          onFail(e);
        });

      //get PlayerLog
      ['normal'].map(type => {
        getPlayerLog(playerId, type)
          .then(response => {
            const { rows } = response.data.matches;
            console.log(nickname, rows);
            setGames([
              ...games,
              ...rows.map(row => {
                return {
                  ...row,
                  gameTypeId: type
                };
              })
            ]);
          })
          .catch(e => {
            console.log(e);
            onFail(e);
          });
      });
    }
  }, [playerId]);
  useEffect(() => {
    console.log('games update', games);
  }, [games]);

  if (!playerInfo) return <div />;
  return (
    <>
      <Section>
        <PageTitle
          align={'center'}
          title={playerInfo.nickname}
          explain={`${playerInfo.grade}급`}
        />
      </Section>
      <br />
      <Tabs
        tabs={[
          {
            label: '전체',
            content: games.map(game => <GameLog game={game} />)
          },
          {
            label: '공식',
            content: games
              .filter(game => game.gameTypeId === 'rating')
              .map(game => <GameLog game={game} />)
          },
          {
            label: '일반',
            content: games
              .filter(game => game.gameTypeId === 'normal')
              .map(game => <GameLog game={game} />)
          }
        ]}
        initActive={'전체'}
      />
    </>
  );
};

PlayerLog.defaultProps = {
  nickname: '',
  onFail: e => {}
};

export default quickConnect(PlayerLog);
