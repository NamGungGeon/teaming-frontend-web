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
import moment from 'moment';
import { ResponsivePie } from '@nivo/pie';

const PlayerLog = ({ uiKit, nickname, onFail }) => {
  const [playerId, setPlayerId] = useState();
  const [playerInfo, setPlayerInfo] = useState();
  const [games, setGames] = useState([]);
  //get playerId
  useEffect(() => {
    setPlayerInfo(null);
    setGames([]);
    uiKit.loading.start();
    getPlayerId(nickname)
      .then(response => {
        console.log(nickname, response.data);
        setPlayerId(response.data.player.playerId);
      })
      .catch(e => {
        onFail(e);
      });

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
      (async () => {
        const tempGames = [];
        for (const type of ['normal', 'rating']) {
          await getPlayerLog(playerId, type)
            .then(response => {
              const { rows } = response.data.matches;
              console.log(nickname, rows);
              rows.map(row => {
                tempGames.push({
                  ...row,
                  gameTypeId: type
                });
              });
            })
            .catch(e => {
              console.log(e);
              onFail(e);
            });
        }
        setGames(
          tempGames.sort((a, b) => {
            const dateFormat = 'YYYY[-]MM[-]DD hh:mm';
            return moment(b.date, dateFormat).diff(moment(a.date, dateFormat));
          })
        );
        uiKit.loading.end();
      })();
    }
  }, [playerId]);
  useEffect(() => {
    console.log('games update', games);
  }, [games]);

  if (!playerInfo) return <div />;

  const gameResultGraph = [
    {
      id: 'win',
      label: '승리',
      value: 0,
      color: 'blue'
    },
    {
      id: 'lose',
      label: '패배',
      value: 0,
      color: 'red'
    }
  ].map(result => {
    games.map(game => {
      if (result.id === game.playInfo.result) result.value++;
    });
    return result;
  });
  return (
    <>
      <Section>
        <PageTitle
          align={'center'}
          title={playerInfo.nickname}
          explain={`${playerInfo.grade}급`}
        />
        <br />
        <div
          style={{
            height: '200px'
          }}
        >
          <ResponsivePie
            data={gameResultGraph}
            colors={['#bee0fb', '#ffd3dd']}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabel={d => `${d.label} (${d.value}게임)`}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="black"
            animate={true}
            enableRadialLabels={false}
            motionStiffness={90}
            motionDamping={15}
            padAngle={2}
          />
        </div>
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
