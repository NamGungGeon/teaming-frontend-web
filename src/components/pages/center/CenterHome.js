import React, {Component} from 'react';
import PageTitle from "../../primitive/PageTitle/PageTitle";
import FAQ from "../../containers/FAQ/FAQ";
import ButtonsWrapper from "../../primitive/ButtonsWrapper/ButtonsWrapper";
import SquareButton from "../../primitive/SquareButton/SquareButton";
import {Button, ListItemIcon} from "@material-ui/core";
import {getPath} from "../../utils/url";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Section from "../../primitive/Section/Section";
import ListItem from "@material-ui/core/ListItem";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import Collapse from "reactstrap/es/Collapse";

class CenterHome extends Component {
  state={
    open: '',
  };

  render() {
    const {history}= this.props;
    const {open}= this.state;

    return (
      <div>
        <PageTitle title={'고객센터'} explain={'도움이 필요하신가요?'}/>
        <br/><br/>
        <Section divideStyle={'fill'}>
          <List>
            <ListItem
              onClick={()=>{
                if(open=== 'service'){
                  this.setState({
                    ...this.state,
                    open: '',
                  });
                }else{
                  this.setState({
                    ...this.state,
                    open: 'service',
                  });
                }
              }}
              button>
              <ArrowRightIcon/>
              &nbsp;&nbsp;
              <ListItemText
                primary="서비스 이용 관련"/>
            </ListItem>
            <Collapse isOpen={open==='service'}>
              <div style={{
                padding: '32px'
              }}>
                이 서비스는 정말 갓갓 입니다!
              </div>
            </Collapse>

            <ListItem
              onClick={()=>{
                history.push(getPath('/center/create'));
              }}
              button>
              <ArrowRightIcon/>
              &nbsp;&nbsp;
              <ListItemText
                primary="여기에서 문제를 찾을 수 없습니다"/>
            </ListItem>
          </List>
        </Section>
      </div>
    );
  }
}

export default CenterHome;