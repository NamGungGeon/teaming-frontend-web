import React, {Component} from 'react';
import {randNum, randStr} from "../../utils/utils";
import styles from './Notices.module.css';
import {getPath} from "../../utils/url";
import {getNotices} from "../../http/tming";
import Spinner from "reactstrap/es/Spinner";
import moment from "moment";

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

  dateFormatting= (date)=>{
    return moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format('YYYY[년]MM[월]DD[일 ]HH[시]mm[분]');
  };

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
                    history.push(getPath(`/important/notices/${notice.id}`));
                  }}>
                  <div className={styles.title}>
                    {notice.title}
                  </div>
                  <div className={styles.date}>
                    {this.dateFormatting(notice.until)}까지 표시됩니다
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