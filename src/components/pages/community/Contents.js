import React, {Component} from 'react';
import Section from "../../primitive/Section/Section";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormGroup from "reactstrap/es/FormGroup";
import Col from "reactstrap/es/Col";
import Button from "@material-ui/core/Button";
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {randStr} from "../../utils/utils";

class Contents extends Component {
  state={
    contents: [
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
      {title: `title: ${randStr(10)}`, content: `${randStr(200)}`},
    ],
    filter: '',
  }

  render() {
    return (
      <div>
        <Section divideStyle={'fill'}>
          <FormGroup
            row
            style={{
              alignItems: 'center',
              margin: '0'
            }}>
            <Col sm={6}>
              <FormControl>
                <Select
                  value={this.state.filter}
                  displayEmpty
                  onChange={(e)=>{
                    this.setState({
                      ...this.state,
                      filter: e.target.value,
                    });
                  }}>
                  <MenuItem value="">
                    모든 글 보기
                  </MenuItem>
                  <MenuItem value={'hottest'}>인기글만 보기</MenuItem>
                  <MenuItem value={'fuckAnonymous'}>익명 사용자 제외하고 보기</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col sm={6}>
              <AlignLayout align={'right'}>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CreateIcon />}
                >
                  글쓰기
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<RefreshIcon />}
                >
                  새로운 글 불러오기
                </Button>
              </AlignLayout>
            </Col>
          </FormGroup>
        </Section>

        <br/>

        {
          this.state.contents.map(content=>{
            return (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={
                    <ExpandMoreIcon />
                  }
                  aria-controls="panel1a-content">
                  <b>
                    {content.title}
                  </b>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {content.content}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </div>
    );
  }
}

export default Contents;