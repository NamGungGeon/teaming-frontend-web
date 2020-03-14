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
  const openDetailPopup = positionId => {
    uiKit.popup.make(<PositionDetail positionId={positionId} />);
  };

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
                <Card
                  style={{
                    boxShadow: 'none'
                  }}
                >
                  <CardHeader
                    style={{
                      padding: 0,
                      paddingBottom: '16px'
                    }}
                    avatar={
                      <Avatar aria-label="recipe">
                        <ImageView
                          img={cyphersResource.getPositionIcon(
                            position.position
                          )}
                        />
                      </Avatar>
                    }
                    title={position.position}
                    subheader={`승률 ${(position.winRate * 100).toFixed(2)}% (${
                      position.count
                    }회 플레이)`}
                  />
                  <CardContent
                    style={{
                      padding: 0
                    }}
                  >
                    <div>
                      <ImageView
                        onClick={() => {
                          openDetailPopup(position.lv1);
                        }}
                        img={openApiRes.getPositionIcon(position.lv1)}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <ImageView
                        onClick={() => {
                          openDetailPopup(position.lv2);
                        }}
                        img={openApiRes.getPositionIcon(position.lv2)}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <ImageView
                        onClick={() => {
                          openDetailPopup(position.lv3);
                        }}
                        img={openApiRes.getPositionIcon(position.lv3)}
                      />
                    </div>
                  </CardContent>
                </Card>
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