import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { quickConnect } from '../../../../redux/quick';
import { beautifyDate, fuckHTML } from '../../../../utils/utils';
import { getMyComaplins } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';

class Asked extends Component {
  state = {
    complains: null,
    count: 0
  };

  async componentDidMount() {
    const { uiKit, auth } = this.props;

    uiKit.loading.start();
    await getMyComaplins(auth)
      .then(response => {
        const { data } = response;
        console.log(data.data);
        this.setState({
          ...this.state,
          count: data.count,
          complains: data.data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  }

  render() {
    const { complains, count } = this.state;

    return (
      <div>
        <PageTitle
          title={'내 문의내역'}
          explain={`${count}개의 내가 문의한 내용이 있습니다`}
        />
        <br />
        {complains && (
          <div>
            {complains.map(complain => {
              return (
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div>
                      ({complain.reply ? '답변완료' : '미답변'}) &nbsp;
                      {fuckHTML(complain.text).slice(0, 15)}...
                      <div className={'explain'}>
                        {beautifyDate(complain.createdAt)}
                      </div>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div
                      style={{
                        width: '100%'
                      }}
                    >
                      <div>
                        <p
                          className={'reader'}
                          dangerouslySetInnerHTML={{ __html: complain.text }}
                        />
                      </div>
                      <br />
                      <div>
                        {complain.reply && (
                          <div>
                            <h5>
                              답변
                              <p className={'explain'}>
                                {beautifyDate(complain.reply.createdAt)}에
                                답장함
                              </p>
                            </h5>
                            <p
                              className={'reader'}
                              dangerouslySetInnerHTML={{
                                __html: complain.reply.text
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default quickConnect(Asked);
