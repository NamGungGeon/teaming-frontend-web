import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../../../redux/quick';
import { createNotice, getMyProfile, getNotices } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import moment from 'moment';
import {authorized, beautifyDate, pageDescription} from '../../../../utils/utils';
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import {Button} from "@material-ui/core";
import uikit from "../../../../redux/quick/uikit";
import Optional from "../../../primitive/Optional/Optional";
import DeleteIcon from '@material-ui/icons/Delete';

class NoticeList extends Component {
  state = {
    notices: null,
    newNoticeTitle: '',
    newNoticeText: '',

    isAdmin: false,

    open: 0
  };

  async componentDidMount() {
    const { uiKit, auth } = this.props;
    pageDescription("티밍: 공지사항", "티밍 공지사항");

    uiKit.loading.start();
    await getNotices()
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          notices: response.data.data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  }

  componentWillUnmount() {
    pageDescription();
  }


  render() {
    const { notices, isAdmin, open } = this.state;
    const {uiKit}= this.props;

    return (
      <div>
        <PageTitle
          title={'공지사항 리스트'}
          explain={'주요 공지사항입니다'}
          align={'left'}
        />
        {notices &&
          (notices.length > 0 ? (
            notices.map(notice => {
              return (
                <ExpansionPanel expanded={notice.id === open}>
                  <ExpansionPanelSummary
                    onClick={() => {
                      if (open === notice.id) {
                        this.setState({
                          ...this.state,
                          open: 0
                        });
                      } else {
                        this.setState({
                          ...this.state,
                          open: notice.id
                        });
                      }
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <div>
                      <span>{notice.title}</span>
                      <br />
                      <span className={'explain'}>
                        {beautifyDate(notice.createdAt)}
                      </span>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    style={{
                      flexDirection: 'column'
                    }}>
                    <div>
                      {notice.text}
                    </div>
                    <br/>
                    <Optional onlyAdmin>
                      <AlignLayout align={'right'}>
                        <Button
                          startIcon={<DeleteIcon/>}
                          onClick={()=>{
                            uiKit.toaster.cooking('개발중');
                          }}
                          fullWidth
                          color={'secondary'}
                          variant={'contained'}>
                          이 공지사항 삭제
                        </Button>
                      </AlignLayout>
                    </Optional>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })
          ) : (
            <p>공지사항이 없습니다</p>
          ))}
      </div>
    );
  }
}

export default quickConnect(NoticeList);
