import React, {Component} from 'react';
import BoardRow from "../BoardRow/BoardRow";
import {randStr} from "../../../utils/utils";
import styles from './BoardWrapper.module.css';

class BoardWrapper extends Component {
  render() {
    const {boards}= this.props;
    return (
      <div className={styles.wrapper}>
        {
          boards.map(board=>{
            return (
              <BoardRow
                key={randStr(5)}
                {...board}/>)
          })
        }
      </div>
    );
  }
}

export default BoardWrapper;