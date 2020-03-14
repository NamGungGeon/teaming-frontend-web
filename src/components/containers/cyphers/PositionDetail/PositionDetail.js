import React, { useEffect, useState } from 'react';
import { quickConnect } from '../../../../redux/quick';
import { getPositionDetail, openApiRes } from '../../../../http/cyphers';
import ImageView from '../../../primitive/ImageView/ImageView';
import styles from './PositionDetail.module.css';
import Spinner from '../../../primitive/Spinner/Spinner';

const PositionDetail = ({ positionId, uiKit }) => {
  const [positionDetail, setPositionDetail] = useState(null);
  useEffect(() => {
    (async () => {
      await getPositionDetail(positionId)
        .then(response => {
          const { data } = response;
          setPositionDetail(data);
          console.log('positionDetail', data);
        })
        .catch(e => {
          console.log(e.response.data);
          uiKit.toaster.cooking(e);
        });
    })();
  }, []);

  if (positionDetail) {
    const { attributeName, explain } = positionDetail;
    return (
      <div>
        <div className={styles.header}>
          <ImageView img={`${openApiRes.getPositionIcon(positionId)}`} />
          &nbsp;&nbsp;&nbsp;
          <h4>{attributeName}</h4>
        </div>
        <br />
        <div>{explain}</div>
      </div>
    );
  } else return <Spinner />;
};

export default quickConnect(PositionDetail);
