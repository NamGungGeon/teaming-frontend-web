import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {quickConnect} from "../../../redux";
import {delay, randNum, randStr} from "../../../utils/utils";
import {Button} from "@material-ui/core";
import {getPath} from "../../../utils/url";

class Asked extends Component {
  state={
    askList: null,
    open: 0,
  }

  async componentDidMount() {
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(1000);
    uiKit.loading.end();

    this.setState({
      ...this.state,
      askList: [
        {id: randNum(1000), title: randStr(10), createdAt: '2020-01-01 12:00', resolved: true, text: '반가워요~~'},
        {id: randNum(1000), title: randStr(10), createdAt: '2020-01-01 12:00', resolved: true, text: '반가워요~~'},
        {id: randNum(1000), title: randStr(10), createdAt: '2020-01-01 12:00', resolved: false, text: '반가워요~~'},
      ]
    });
  }

  render() {
    const {askList, open}= this.state;
    const {history}= this.props;

    return (
      <div>
        <PageTitle title={'내 문의내역'} explain={'내가 문의한 내용'}/>
        <br/>
        <div>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={()=>{
              history.push(getPath(`/mypage/service/asking`))
            }}>
            새로운 문의 작성
          </Button>
        </div>
        <br/>
        {
          askList && (
            <div>
              {
                askList.map(ask=>{
                  return (
                    <ExpansionPanel
                      expanded={ask.id=== open}>
                      <ExpansionPanelSummary
                        onClick={()=>{
                          if(open=== ask.id){
                            this.setState({
                              ...this.state,
                              open: 0,
                            });
                          }else{
                            this.setState({
                              ...this.state,
                              open: ask.id,
                            });
                          }
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content">
                        <div>
                          <span>
                            {ask.resolved? '(답변완료)': '(처리중)'}
                            &nbsp;
                            {ask.title}
                          </span>
                          <br/>
                          <span
                            className={'explain'}>
                            {ask.createdAt}
                          </span>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{
                        flexDirection: 'column',
                      }}>
                        {ask.text}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default quickConnect(Asked);