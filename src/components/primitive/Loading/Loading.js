import React, { Component } from 'react';
import styles from './Loading.module.css';
import ImageView from "../ImageView/ImageView";

class Loading extends Component {
  render() {
    return (
      <ImageView className={styles.logo}/>
    )

    // return (
    //   <div className={styles.loadingWrapper}>
    //     <div className={styles['lds-heart']}>
    //       <div></div>
    //     </div>
    //   </div>
    // );
  }
}

export default Loading;
