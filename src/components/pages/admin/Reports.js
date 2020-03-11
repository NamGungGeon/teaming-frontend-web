import React, { Component, useEffect, useState } from 'react';
import { quickConnect } from '../../../redux/quick';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Button
} from '@material-ui/core';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import HashTable from '../../primitive/HashTable/HashTable';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { errMsg } from '../../../http/util';
import { agreeReport, disagreeReport, getReports } from '../../../http/tming';
import axios from 'axios';

const evalObject = object => {
  return (
    <HashTable
      keyWidth={'128px'}
      table={Object.keys(object).map(key => {
        return {
          key: key,
          value: object[key]
        };
      })}
    />
  );
};
const Reports = ({ auth, uiKit, history }) => {
  const [content, setContent] = useState(null);
  const [reports, setReports] = useState(null);
  const loadReports = async () => {
    console.log('load reports');
    uiKit.loading.start();
    await getReports(auth)
      .then(response => {
        console.log(response.data.data);
        setReports(
          response.data.data.map(report => {
            return {
              id: report.id,
              username: report.author ? report.author.username : '익명',
              endpoint: report.ref,
              text: report.detail,
              isSolved: report.status !== 'IN_PROGRESS',
              status: report.status
            };
          })
        );
      })
      .catch(e => {
        console.log(e);
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };
  const blindContent = async (reportId, endPoint) => {
    await agreeReport(auth, reportId)
      .then(response => {
        uiKit.toaster.cooking('처리되었습니다 (ACCEPTED)');
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.start();
    await loadReports();
    uiKit.loading.end();
  };
  const removeReport = async reportId => {
    await disagreeReport(auth, reportId)
      .then(response => {
        uiKit.toaster.cooking('처리되었습니다 (REJECTED)');
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.start();
    await loadReports();
    uiKit.loading.end();
  };
  const showContent = async endpoint => {
    uiKit.loading.start();
    await axios
      .request({
        method: 'GET',
        url: `https://api.tming.kr/v0.1${endpoint}`,
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(response => {
        const { data } = response;
        const evaluated = evalObject(data);
        setContent(evaluated);
        console.log('evaluated', evaluated);
        console.log('showContent', content);
        console.log('load successfully');
      })
      .catch(e => {
        console.log('load fail');
        setContent('');
        uiKit.toaster.cooking(errMsg(e));
      });
    console.log(content);
    uiKit.popup.make(
      <div>
        <h3>컨텐츠 내용</h3>
        <br />
        {content}
      </div>
    );
    uiKit.loading.end();
  };

  useEffect(() => {
    loadReports();
    return () => {
      uiKit.destroyAll();
    };
  }, []);

  return (
    <div>
      <PageTitle title={'컨텐츠 신고 목록'} explain={`신고목록`} />
      <br />
      {reports &&
        reports.map((report, idx) => {
          return (
            <ExpansionPanel key={`${report.text}_${idx}`}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div>
                  {report.isSolved ? '(처리됨' : '(처리되지 않음'}
                  &nbsp; :: {report.status}) &nbsp;
                  {report.text.length > 20
                    ? report.text.length.slice(0, 20)
                    : report.text}
                  <div className="explain">{report.endpoint}</div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div
                  style={{
                    width: '100%'
                  }}
                >
                  <p>{report.text}</p>
                  <AlignLayout align={'right'}>
                    <Button
                      onClick={() => {
                        showContent(report.endpoint);
                      }}
                      variant="contained"
                    >
                      컨텐츠 내용 보기
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => {
                        blindContent(report.id, report.endpoint);
                      }}
                      startIcon={<DoneIcon />}
                      color="secondary"
                      variant="contained"
                    >
                      블라인드
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => {
                        removeReport(report.id);
                      }}
                      startIcon={<DeleteIcon />}
                      color="primary"
                      variant="contained"
                    >
                      기각
                    </Button>
                  </AlignLayout>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
    </div>
  );
};

export default quickConnect(Reports);
