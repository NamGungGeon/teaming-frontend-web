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
import Pagenation from "../../primitive/Pagenation/Pagenation";

class Contents extends Component {
  state={
    contents: [],
    filter: '',
    myComment: '',

    count: 0,
    offset: 0,
  };

  componentDidMount() {
    const {location}= this.props;
    const {offset}= urlQuery(location);

    this.loadContents(offset? offset: 0);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const getOffset= (location)=>{
      const {offset}= urlQuery(location);
      return offset? offset: 0;
    };
    const getCategory= (location)=>{
      const {category}= urlQuery(location);
      return category? category: 'general';
    };

    if(
      (getOffset(prevProps.location)!== getOffset(this.props.location))
      ||
      (getCategory(prevProps.location)!== getCategory(this.props.location))
    )
      this.componentDidMount();
  }

  loadContents= async (offset)=>{
    window.scrollTo(0,0);

    const {filter}= this.state;
    const {uiKit, location, history}= this.props;

    const query= urlQuery(location);
    const category= query.category? query.category: 'general';

    history.replace(getPath(`/community?offset=${offset}&category=${category}`));

    uiKit.loading.start();
    await getBoardPosts(category, filter==='fuckAnonymous', 10, offset)
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
          count: data.count,
          offset,
        })
      }).catch(e=>{
        console.log(e);
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  getBoardName= ()=>{
    const {location}= this.props;
    const {category}= urlQuery(location);

    switch (category) {
      case "general":
        return "자유게시판";
      case "anonymous":
        return "익명게시판";
      case "lol":
        return "리그 오브 레전드 게시판";
      case "cyphers":
        return "사이퍼즈 게시판";
      default:
        return "자유게시판";
    }
  }

  render() {
    const {match, location, history}= this.props;
    const {paging, count, offset}= this.state;

    const query= urlQuery(location);

    return (
      <div>
        <PageTitle
          title={this.getBoardName()}
          explain={`${this.getBoardName()} 입니다`}
          align={'left'}/>
        <br/>

        <Section divideStyle={'fill'}>
          <FormGroup
            row
            style={{
              alignItems: 'center',
              margin: '0'
            }}>
            <Col sm={6}>
              <FormControl style={{
                width: '100%'
              }}>
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
            <Col sm={6}>
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
        <Pagenation
          paging={(page)=>{
            console.log('page', page);
            this.loadContents(10*(page-1));
          }}
          min={1}
          current={parseInt(offset/10+1)}
          max={parseInt(count/10+1)}/>
        <br/>
      </div>
    );
  }
}

export default quickConnect(Contents);