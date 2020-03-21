import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import ImageView from '../../../primitive/ImageView/ImageView';
import {
  cyphersResource,
  getCharacterPosition,
  openApiRes
} from '../../../../http/cyphers';
import CardContent from '@material-ui/core/CardContent';
import styles from './RecommendPositions.module.css';
import { quickConnect } from '../../../../redux/quick';
import PositionDetail from '../PositionDetail/PositionDetail';
import Spinner from '../../../primitive/Spinner/Spinner';
import AttributeCombination from '../AttributeCombination/AttributeCombination';

const RecommendPositions = ({ nameKR, uiKit }) => {
  const [position, setPosition] = useState();
  useEffect(() => {
    setPosition(null);
    getCharacterPosition(nameKR)
      .then(response => {
        setPosition(response.data);
      })
      .catch(e => {
        uiKit.toaster.cooking(e);
      });
  }, [nameKR]);
  return (
    <div>
      <h3>포지션 통계</h3>
      {position ? (
        <div>
          <p className={'explain'}>{position.analyzedDate}</p>
          <br />
          <div className={styles.wrapper}>
            {position.result.slice(0, 3).map((position, idx) => {
              return (
                <AttributeCombination
                  positionName={position.position}
                  explain={`승률 ${(position.winRate * 100).toFixed(2)}% (${
                    position.count
                  }회 플레이)`}
                  attributes={[position.lv1, position.lv2, position.lv3]}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default quickConnect(RecommendPositions);
