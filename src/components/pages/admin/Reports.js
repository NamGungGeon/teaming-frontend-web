import React, { Component, useEffect, useState } from 'react';
import { quickConnect } from '../../../redux/quick';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { delay } from '../../../utils/utils';
import BoardWrapper from '../../primitive/Board/BoardWrapper/BoardWrapper';
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

const evalObject = object => {
  return (
    <HashTable
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
  const [reports, setReports] = useState(null);
  const loadReports = async () => {
    console.log('load reports');
    uiKit.loading.start();
    await delay(1000);
    setReports([
      {
        isSolved: false,
        text: '태스트 신고',
        id: 1,
        endpoint: '/'
      },
      {
        isSolved: false,
        text: '태스트 신고',
        id: 1,
        endpoint: '/'
      },
      {
        isSolved: false,
        text: '태스트 신고',
        id: 1,
        endpoint: '/'
      },
      {
        isSolved: false,
        text: '태스트 신고',
        id: 1,
        endpoint: '/'
      }
    ]);
    uiKit.loading.end();
  };
  const blindContent = (reportId, endPoint) => {
    loadReports();
  };
  const removeReport = reportId => {
    loadReports();
  };
  const showContent = async endPoint => {
    uiKit.loading.start();
    await delay(1000);
    uiKit.popup.make(
      <div>
        <h3>컨텐츠 내용</h3>
        <br />
        <p>이 곳에 컨텐츠 내용이 표시됩니다</p>
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
                  {report.isSolved ? '(처리됨)' : '(처리되지 않음)'}
                  &nbsp;
                  {report.text.length > 20
                    ? report.text.length.slice(0, 20)
                    : report.text}
                  <div className="explain">접수시간</div>
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
                        showContent(report.endPoint);
                      }}
                      variant="contained"
                    >
                      컨텐츠 내용 보기
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => {
                        blindContent(report.id, report.endPoint);
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
