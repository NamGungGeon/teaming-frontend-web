import React, { useEffect, useState } from 'react';
import { quickConnect } from '../../../../redux/quick';
import { getPositionDetail, openApiRes } from '../../../../http/cyphers';
import ImageView from '../../../primitive/ImageView/ImageView';
import styles from './PositionDetail.module.css';

const PositionDetail = ({ positionId, uiKit }) => {
  const [positionDetail, setPositionDetail] = useState(null);
  useEffect(() => {
    (async () => {
      uiKit.loading.start();
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
      uiKit.loading.end();
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
  } else return <div></div>;
};

export default quickConnect(PositionDetail);
