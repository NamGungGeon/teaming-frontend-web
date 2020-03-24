import React, { useEffect, useState } from 'react';
import Section from '../../../primitive/Section/Section';
import Spinner from '../../../primitive/Spinner/Spinner';
import { getCharacterRanker, openApiRes } from '../../../../http/cyphers';
import BoardWrapper from '../../../primitive/Board/BoardWrapper/BoardWrapper';
import getHistory from 'react-router-global-history';

const CypherRanker = ({ characterId }) => {
  const [rankers, setRankers] = useState();
  useEffect(() => {
    // rank: 1
    // playerId: "b5ac09e3284b1b02d9243fdd1e4d6e66"
    // nickname: "계란후라이장인"
    // grade: 85
    // winCount: 36
    // loseCount: 27
    // clanName: "기약"
    getCharacterRanker(characterId)
      .then(response => {
        const { rows } = response.data;
        console.log('ranker', rows);
        setRankers(rows);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  if (!rankers) return <Spinner />;
  else
    return (
      <>
        <h3>캐릭터 랭킹 (승리수)</h3>
        <br />
        <BoardWrapper
          boards={[
            ...rankers.map(ranker => {
              return {
                title: `[${ranker.rank}위] ${ranker.nickname}`,
                explains: [
                  `${ranker.winCount}승 ${ranker.loseCount}패 (승률: ${(
                    (ranker.winCount * 100) /
                    (ranker.winCount + ranker.loseCount)
                  ).toFixed(2)}%)`
                ],
                thumbnail: null,
                onClick: () => {
                  getHistory().push(
                    `/cyphers/players?nickname=${ranker.nickname}`
                  );
                }
              };
            })
          ]}
        />
      </>
    );
};

export default CypherRanker;
