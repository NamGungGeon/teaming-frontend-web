import React, { useEffect, useState } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const evalObject = object => {
  return (
    <HashTable
      keyWidth={'128px'}
      table={Object.keys(object).map(key => {
        return {
          key: key,
          value:
            typeof object[key] === 'object' && object[key]
              ? object[key].toString()
              : object[key]
        };
      })}
    />
  );
};
const Reports = ({ auth, uiKit, history }) => {
  const [content, setContent] = useState(null);
  const [reports, setReports] = useState(null);
  const [filter, setFilter] = useState('ALL');

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
        console.error(e);
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };
  const blindContent = async (reportId, endpoint) => {
    const reportSet = reports.filter(report => report.endpoint === endpoint);
    uiKit.loading.start();
    for (let l = 0; l < reportSet.length; l++) {
      const report = reportSet[l];
      await agreeReport(auth, report.id)
        .then(response => {
          uiKit.toaster.cooking('처리되었습니다 (ACCEPTED)');
        })
        .catch(e => {
          uiKit.toaster.cooking(errMsg(e));
        });
    }
    await loadReports();
    uiKit.loading.end();
  };
  const removeReport = async (reportId, endpoint) => {
    const reportSet = reports.filter(report => report.endpoint === endpoint);

    uiKit.loading.start();
    for (let l = 0; l < reportSet.length; l++) {
      const report = reportSet[l];
      await disagreeReport(auth, report.id)
        .then(response => {
          uiKit.toaster.cooking('처리되었습니다 (REJECTED)');
        })
        .catch(e => {
          uiKit.toaster.cooking(errMsg(e));
        });
    }
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
      .then(async response => {
        const { data } = response;
        const evaluated = evalObject(data);
        await setContent(evaluated);
        console.log('evaluated', evaluated);
        console.log('showContent', content);
        console.log('load successfully');
      })
      .catch(e => {
        console.log('load fail', e);
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  useEffect(() => {
    loadReports();
    return () => {
      uiKit.destroyAll();
    };
  }, []);
  useEffect(() => {
    if (content)
      uiKit.popup.make(
        <div>
          <h3>컨텐츠 내용</h3>
          <br />
          {content}
        </div>
      );
  }, [content]);

  return (
    <div>
      <PageTitle title={'컨텐츠 신고 목록'} explain={`신고목록`} />
      <br />

      <FormControl fullWidth size={'small'} variant={'outlined'}>
        <Select
          value={filter}
          displayEmpty
          onChange={e => {
            setFilter(e.target.value);
          }}
        >
          <MenuItem value={'ALL'}>전체보기</MenuItem>
          <MenuItem value={'IN_PROGRESS'}>대기중</MenuItem>
          <MenuItem value={'ACCEPTED'}>블라인드 처리됨</MenuItem>
          <MenuItem value={'REJECTED'}>거절됨</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      {reports &&
        reports
          .filter(report => filter === 'ALL' || filter === report.status)
          .map((report, idx) => {
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
                          removeReport(report.id, report.endpoint);
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
