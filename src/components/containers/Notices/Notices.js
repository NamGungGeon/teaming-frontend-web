import React, {Component} from 'react';
import {randNum, randStr} from "../../utils/utils";
import styles from './Notices.module.css';
import {getPath} from "../../utils/url";
import {getNotices} from "../../http/tming";
import Spinner from "reactstrap/es/Spinner";

class Notices extends Component{
  state={
    notices: null,
  }

  componentDidMount() {
    getNotices().then(response => {
      console.log('get notices', response.data);
      this.setState({
        ...this.state,
        notices: response.data.data
      })
    });
  }

  render() {
    const {history}= this.props;
    const {notices}= this.state;

    if(notices && notices.length=== 0){
      return (<p>공지사항이 없습니다</p>)
    }

    return (
      <div style={{
        textAlign: 'left',
      }}>
        {
          notices?

            notices.map(notice=>{
              return (
                <p
                  className={styles.notice}
                  onClick={()=>{
                    history.push(getPath(`/notices/${notice.id}`));
                  }}>
                <span className={styles.title}>
                {notice.title}
                </span>
                  <div className={styles.date}>
                    {notice.until}
                  </div>
                </p>
              )
            })
            :
            (
              <div style={{
                width: '100%',
                textAlign: 'center',
                padding: '32px',
              }}>
                <Spinner/>
              </div>
            )
        }
      </div>
    );
  }

}

export default Notices;