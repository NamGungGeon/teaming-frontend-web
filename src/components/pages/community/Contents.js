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
import {beautifyDate, delay, randNum} from "../../utils/utils";
import {getPath, urlQuery} from "../../utils/url";
import {quickConnect} from "../../redux";
import BoardWrapper from "../../primitive/Board/BoardWrapper/BoardWrapper";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import {getBoardPosts} from "../../http/tming";
import {errMsg} from "../../http/util";

class Contents extends Component {
  state={
    contents: [],
    filter: '',
    paging: null,
    myComment: '',
  };

  componentDidMount() {
    this.loadContents();
    console.log(this.props.history);
  }

  loadContents= async ()=>{
    const {filter}= this.state;
    const {uiKit, location, auth}= this.props;

    const query= urlQuery(location);
    const category= query.category? query.category: 'general';

    uiKit.loading.start();
    await getBoardPosts(category, filter==='fuckAnonymous', 10000, 0)
      .then(response=>{
        const {data}= response;
        console.log(data);

        if(data.data.length=== 0){
          uiKit.toaster.cooking('이 게시판에 아직 글이 없습니다');
        }

        this.setState({
          ...this.state,
          contents: data.data.map(content=>{
            return {
              id: content.id,
              title: content.title+ ` [${content.comments}]`,
              content: content.body,
              nickname: content.author? content.author.username: '익명',
              createDate: content.createdAt,
            }
          }),
          paging: data.paging,
        })
      }).catch(e=>{
        console.log(e);
        uiKit.toaster.cooking(errMsg(e));
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
                    history.push(getPath(`/community/write?category=${query.category? query.category: ''}`));
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
              title: `${content.title}`,
              exp_l: `${content.nickname}`,
              exp_r: `${beautifyDate(content.createDate)}`,
              onClick: ()=>{
                history.push(getPath(`/community/read/${content.id}?category=${query.category? query.category: ''}`))
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