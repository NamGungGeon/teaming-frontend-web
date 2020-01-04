import React, {Component} from 'react';
import Section from "../../primitive/Section/Section";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "reactstrap/es/FormGroup";
import Col from "reactstrap/es/Col";
import Button from "@material-ui/core/Button";
import RefreshIcon from '@material-ui/icons/Refresh';
import CreateIcon from '@material-ui/icons/Create';
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {delay, randNum} from "../../utils/utils";
import {getPath, urlQuery} from "../../utils/url";
import {quickConnect} from "../../redux";
import BoardWrapper from "../../primitive/Board/BoardWrapper/BoardWrapper";
import PageTitle from "../../primitive/PageTitle/PageTitle";

class Contents extends Component {
  state={
    contents: [],
    filter: '',

    myComment: '',
  };

  componentDidMount() {
    this.loadContents();
  }

  loadContents= async ()=>{
    const {filter}= this.state;
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(500);
    this.setState({
      ...this.state,
      contents: [
        {id: randNum(1000), title: `title`, content: `content`, nickname: '제이쿼리권위자', createDate: '3일 전',},
        {id: randNum(1000), title: `title`, content: `content`, nickname: '제이쿼리권위자', createDate: '3일 전',},
        {id: randNum(1000), title: `title`, content: `content`, nickname: '제이쿼리권위자', createDate: '3일 전',},
        {id: randNum(1000), title: `title`, content: `content`, nickname: '제이쿼리권위자', createDate: '3일 전',},
        {id: randNum(1000), title: `title`, content: `content`, nickname: '제이쿼리권위자', createDate: '3일 전',},
        {id: randNum(1000), title: `title`, content: `content`, nickname: '제이쿼리권위자', createDate: '3일 전',},
        {id: randNum(1000), title: `title`, content: `content`, nickname: '제이쿼리권위자', createDate: '3일 전',},
      ],
    });
    uiKit.loading.end();
  };

  render() {
    const {match, location, history}= this.props;
    const query= urlQuery(location);

    return (
      <div>
        <PageTitle
          title={'커뮤니티'}
          explain={'커뮤니티입니다'}
          align={'left'}/>
        <br/>

        <Section divideStyle={'fill'}>
          <FormGroup
            row
            style={{
              alignItems: 'center',
              margin: '0'
            }}>
            <Col sm={4}>
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
                  <MenuItem value={'hottest'}>
                    인기글만 보기
                  </MenuItem>
                  <MenuItem value={'fuckAnonymous'}>
                    익명 사용자 제외하고 보기
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col sm={8}>
              <AlignLayout align={'right'}>
                <Button
                  onClick={()=>{
                    history.push(getPath(`/community/write`));
                  }}
                  variant="contained"
                  color="primary"
                  startIcon={<CreateIcon />}
                >
                  글쓰기
                </Button>
                &nbsp;
                <Button
                  onClick={this.loadContents}
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

        <BoardWrapper boards={
          this.state.contents.map(content=>{
            return {
              title: content.title,
              exp_l: `${content.nickname}`,
              exp_r: `${content.createDate}`,
              onClick: ()=>{
                history.push(getPath(`/community/read/${content.id}`))
              },
            }
          })
        }/>

        <br/>
      </div>
    );
  }
}

export default quickConnect(Contents);