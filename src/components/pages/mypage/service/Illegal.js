import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import {quickConnect} from "../../../redux";
import {delay, randNum, randStr} from "../../../utils/utils";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {Button} from "@material-ui/core";

class Illegal extends Component {state={
  illegals: null,
  open: 0,
}

  async componentDidMount() {
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(1000);
    uiKit.loading.end();

    this.setState({
      ...this.state,
      illegals: [
        {id: randNum(1000), title: randStr(10), createdAt: '2020-01-01 12:00', text: '이녀석 완전 악질이야!'},
        {id: randNum(1000), title: randStr(10), createdAt: '2020-01-01 12:00', text: '이녀석 완전 악질이야!'},
        {id: randNum(1000), title: randStr(10), createdAt: '2020-01-01 12:00', text: '이녀석 완전 악질이야!'},
        {id: randNum(1000), title: randStr(10), createdAt: '2020-01-01 12:00', text: '이녀석 완전 악질이야!'},
      ]
    });
  }

  render() {
    const {illegals, open}= this.state;

    return (
      <div>
        <PageTitle title={'제재내역'} explain={'내 제재내역 목록입니다'}/>
        {
          illegals && (
            <div>
              {
                illegals.map(illegal=>{
                  return (
                    <ExpansionPanel
                      expanded={illegal.id=== open}>
                      <ExpansionPanelSummary
                        onClick={()=>{
                          if(open=== illegal.id){
                            this.setState({
                              ...this.state,
                              open: 0,
                            });
                          }else{
                            this.setState({
                              ...this.state,
                              open: illegal.id,
                            });
                          }
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content">
                        <div>
                          <span>
                            {illegal.title}
                          </span>
                          <br/>
                          <span
                            className={'explain'}>
                            {illegal.createdAt}
                          </span>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{
                        flexDirection: 'column',
                      }}>
                        <p>
                          {illegal.text}
                        </p>
                        <Button
                          variant={'contained'}
                          color={'secondary'}>
                          이의신청
                        </Button>
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

export default quickConnect(Illegal);