import React, { Component } from 'react';
import styles from './Address.module.css';

const Address = ({ picture, name, explain, options, onClick }) => {
  return (
    <div onClick={onClick} className={styles.wrapper}>
      {typeof picture === 'string' ? <img src={picture} alt="" /> : picture}
      <div className={styles.info}>
        <h5>{name}</h5>
        <div className={'explain'}>{explain}</div>
      </div>
      <div>
        {options.map(option => {
          return option;
        })}
      </div>
    </div>
  );
};

Address.defaultProps = {
  picture: '',
  onClick: () => {}
};

export default Address;
