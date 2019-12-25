import React, {Component} from 'react';
import {randNum, randStr} from "../../utils/utils";
import styles from './Notices.module.css';
import {getPath} from "../../utils/url";
import {getNotices} from "../../http/tming";
import Spinner from "reactstrap/es/Spinner";

class Notices extends Component{
  //localhost:3000/auth/signin?hideNav=true&id=fc2489a0-e40b-41a6-8479-2e987cefb3c7&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjMjQ4OWEwLWU0MGItNDFhNi04NDc5LTJlOTg3Y2VmYjNjNyIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE1NzcyOTAwMDQsImV4cCI6MTU3OTg4MjAwNCwiaXNzIjoidG1pbmcua3IifQ.EhrqWtSI7AR86HSqOpr8aGUTh7dFAEITbbwMRPVmmgI&refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjMjQ4OWEwLWU0MGItNDFhNi04NDc5LTJlOTg3Y2VmYjNjNyIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNTc3MjkwMDA0LCJleHAiOjE2MDg4MjYwMDQsImlzcyI6InRtaW5nLmtyIn0.kZpYrHxZjFdg-5OhGDsO5Qmh6F8qLNcRv_pIdsPw4to
  state={
    notices: null,
  }

  componentDidMount() {
    getNotices().then(response => {

    });
  }

  render() {
    const {history}= this.props;
    const {notices}= this.state;

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
                    {notice.date}
                  </div>
                </p>
              )
            })
            :
            (<Spinner/>)
        }
      </div>
    );
  }

}

export default Notices;