import React, { Component } from 'react';
import Section from '../../primitive/Section/Section';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RefreshIcon from '@material-ui/icons/Refresh';
import CreateIcon from '@material-ui/icons/Create';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import {
  getImageSrcFromHTML,
  momenting,
  pageDescription
} from '../../../utils/utils';
import { getPath, urlQuery } from '../../../utils/url';
import { quickConnect } from '../../../redux/quick';
import BoardWrapper from '../../primitive/Board/BoardWrapper/BoardWrapper';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { getBoardPosts } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import Pagenation from '../../primitive/Pagenation/Pagenation';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { PopupMaker } from '../../hoc/PopupMaker';
import { ExpansionPanel } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tooltip from '@material-ui/core/Tooltip';
import HashTable from '../../primitive/HashTable/HashTable';
import ReorderIcon from '@material-ui/icons/Reorder';
import WhatshotIcon from '@material-ui/icons/Whatshot';

class Contents extends Component {
  state = {
    contents: [],
    myComment: '',

    search: '',
    searchField: 'title',
    count: 0,
    offset: 0,
    openSearchPanel: false
  };

  componentDidMount() {
    const { location } = this.props;
    const { offset } = urlQuery(location);

    pageDescription('티밍: ' + this.getBoardName(), this.getBoardName());
    this.loadContents(offset ? offset : 0);

    this.popup = PopupMaker(this);
  }
  componentWillUnmount() {
    pageDescription();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('state', this.state);

    const getOffset = location => {
      const { offset } = urlQuery(location);
      return offset ? offset : 0;
    };
    const getCategory = location => {
      const { category } = urlQuery(location);
      return category ? category : 'general';
    };
    const getSearch = location => {
      const { search } = urlQuery(location);
      return search;
    };

    if (
      getOffset(prevProps.location) !== getOffset(this.props.location) ||
      getCategory(prevProps.location) !== getCategory(this.props.location) ||
      getSearch(prevProps.location) !== getSearch(this.props.location)
    )
      this.componentDidMount();
  }
  getCategory = () => {
    const query = urlQuery(this.props.location);
    return query.category ? query.category : 'general';
  };
  loadContents = async offset => {
    window.scrollTo(0, 0);
    this.setState({
      ...this.state,
      contents: []
    });

    const { uiKit, location } = this.props;
    const { category, search, searchField } = urlQuery(location);

    uiKit.loading.start();
    await getBoardPosts(
      category ? category : 'general',
      10,
      offset,
      searchField,
      search
    )
      .then(response => {
        const { data } = response;
        console.log(data);

        if (data.data.length === 0) {
          if (search) uiKit.toaster.cooking('검색 결과가 없습니다');
          else uiKit.toaster.cooking('이 게시판에 아직 글이 없습니다');
        }

        this.setState({
          ...this.state,
          contents: data.data.map(content => {
            return {
              id: content.id,
              title: content.title + ` [${content.comments}]`,
              content: content.body,
              nickname: content.author ? content.author.username : '익명',
              createDate: content.createdAt,
              views: content.views
            };
          }),
          count: data.count,
          offset
        });
      })
      .catch(e => {
        console.log(e);
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  getBoardName = () => {
    const { location } = this.props;
    const { category } = urlQuery(location);

    switch (category) {
      case 'general':
        return '자유게시판';
      case 'anonymous':
        return '익명게시판';
      case 'lol':
        return '리그 오브 레전드 게시판';
      case 'cyphers':
        return '사이퍼즈 게시판';
      case 'overwatch':
        return '오버워치 게시판';
      case 'pubg':
        return '배틀그라운드 게시판';
      default:
        return '자유게시판';
    }
  };
  render() {
    const { location, history } = this.props;
    const { count, offset, openSearchPanel } = this.state;

    const query = urlQuery(location);
    const searching = () => {
      const { uiKit, history } = this.props;
      const { search, searchField } = this.state;
      if (!search) {
        uiKit.toaster.cooking('검색어를 입력하세요');
        return;
      }

      this.popup.destroy();
      history.push(
        `/community?category=${this.getCategory()}&search=${search}&searchField=${searchField}&&offset=0`
      );
    };

    return (
      <div>
        {this.popup && this.popup.render()}
        <Section divideStyle={'fill'}>
          <PageTitle
            title={this.getBoardName()}
            explain={`${this.getBoardName()} 입니다`}
            align={'left'}
          />
          <div>
            <ExpansionPanel
              style={{
                boxShadow: 'none',
                padding: '0'
              }}
              expanded={openSearchPanel}
            >
              <ExpansionPanelSummary
                style={{
                  display: 'none'
                }}
              />
              <ExpansionPanelDetails
                style={{
                  padding: 0
                }}
              >
                <div style={{ flex: 1 }}>
                  <HashTable
                    table={[
                      {
                        key: (
                          <FormControl
                            fullWidth
                            size={'small'}
                            variant={'outlined'}
                          >
                            <Select
                              style={{
                                width: '100%',
                                border: 'none'
                              }}
                              value={this.state.searchField}
                              displayEmpty
                              onChange={e => {
                                this.setState({
                                  ...this.state,
                                  searchField: e.target.value
                                });
                              }}
                            >
                              <MenuItem value="title">제목에서 찾기</MenuItem>
                              <MenuItem value={'body'}>본문에서 찾기</MenuItem>
                              <MenuItem value={'author'}>
                                작성자로 찾기
                              </MenuItem>
                            </Select>
                          </FormControl>
                        ),
                        value: (
                          <TextField
                            size={'small'}
                            fullWidth
                            placeholder={'키워드를 입력하세요'}
                            type={'text'}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                searching();
                              }
                            }}
                            onChange={e => {
                              this.setState({
                                ...this.state,
                                search: e.target.value
                              });
                            }}
                          />
                        )
                      }
                    ]}
                  />
                  <AlignLayout align={'right'}>
                    <Button
                      fullWidth
                      onClick={searching}
                      startIcon={<SearchIcon />}
                      variant={'contained'}
                      color={'primary'}
                    >
                      검색
                    </Button>
                  </AlignLayout>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <AlignLayout align={'right'}>
              <Tooltip title={'게시글 검색'}>
                <IconButton
                  variant="contained"
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      openSearchPanel: !openSearchPanel
                    });
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              &nbsp;
              <Tooltip title={'글쓰기'}>
                <IconButton
                  onClick={() => {
                    history.push(
                      getPath(
                        `/community/write?category=${
                          query.category ? query.category : ''
                        }`
                      )
                    );
                  }}
                  variant="contained"
                >
                  <CreateIcon />
                </IconButton>
              </Tooltip>
              &nbsp;
              <Tooltip title={'새로고침'}>
                <IconButton onClick={this.loadContents} variant="contained">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </AlignLayout>
          </div>
        </Section>
        <br />
        <div
          style={{
            padding: '16px',
            backgroundColor: 'white',
            borderBottom: '0.6px solid #e9e9e9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <Button startIcon={<ReorderIcon />} color="secondary">
              전체
            </Button>
            <Button startIcon={<WhatshotIcon />}>인기글</Button>
          </div>
          <div>
            <Tooltip title={'글쓰기'}>
              <IconButton
                color={'secondary'}
                onClick={() => {
                  history.push(
                    getPath(
                      `/community/write?category=${
                        query.category ? query.category : ''
                      }`
                    )
                  );
                }}
                variant="contained"
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <BoardWrapper
          boards={this.state.contents.map(content => {
            console.log(content.title, content);
            return {
              title: `${content.title}`,
              explains: [
                `닉네임: ${content.nickname}`,
                `| ${momenting(content.createDate).fromNow()}`,
                `| 조회수 ${content.views}회`
              ],
              thumbnail: getImageSrcFromHTML(content.content),
              onClick: () => {
                history.push(
                  getPath(
                    `/community/read/${content.id}?category=${
                      query.category ? query.category : ''
                    }`
                  )
                );
              }
            };
          })}
        />

        <br />
        <Pagenation
          paging={page => {
            console.log('page', page);
            const nextOffset = 10 * (page - 1);

            const { category, search } = urlQuery(location);
            history.push(
              getPath(
                `/community?offset=${nextOffset}&category=${
                  category ? category : ''
                }&search=${search ? search : ''}`
              )
            );
          }}
          min={1}
          current={parseInt(offset / 10 + 1)}
          max={parseInt(count / 10 + 1)}
        />
        <br />
      </div>
    );
  }
}

export default quickConnect(Contents);
