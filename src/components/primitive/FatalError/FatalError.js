import React from 'react';
import styles from './FatalError.module.css';
import ErrorIcon from '@material-ui/icons/Error';

const FatalError = () => {
  return (
    <div className={styles.background}>
      <ErrorIcon className={styles.oops} />
      <br />
      <br />
      <p className={styles.explain}>
        죄송합니다. 치명적인 오류가 발생되었습니다.
        <br />
        새로고침을 진행하면 정상적으로 서비스를 이용하실 수 있습니다.
      </p>
    </div>
  );
};

export default FatalError;
