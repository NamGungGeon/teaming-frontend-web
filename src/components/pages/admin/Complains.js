import React, {Component} from 'react';
import PageTitle from "../../primitive/PageTitle/PageTitle";
import List from "@material-ui/core/List";
import {quickConnect} from "../../../redux/quick";
import {getComplains, replyComplain} from "../../../http/tming";
import {errMsg} from "../../../http/util";
import {ExpansionPanel} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {beautifyDate, fuckHTML} from "../../../utils/utils";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import Button from "@material-ui/core/Button";
import Wysiwyg from "../../primitive/WYSIWYG/WYSIWYG";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Col from "reactstrap/es/Col";

class Complains extends Component {
  state={
    complains: null,
    count: 0,
    filter: '',
  };

  async componentDidMount() {
    const {uiKit, auth}= this.props;

    uiKit.loading.start();
    await getComplains(auth).then(response=>{
      const {data}= response;
      console.log(data.data);
      this.setState({
        ...this.state,
        count: data.count,
        complains: data.data,
      });
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  reply= (complain)=>{
    const {auth, uiKit}= this.props;

    uiKit.popup.make((
      <div>
        <div>
          <h5>
            문의 내용
          </h5>
          <p
            className={'reader'}
            dangerouslySetInnerHTML={ {__html: complain.text}}/>
        </div>
        <br/><br/>
        <div>
          <h5>
            답장하기
            <div className={'explain'}>
              사진 첨부는 불가능합니다
            </div>
          </h5>
          <Wysiwyg
            ref={ref=> this.editor= ref}/>
          <br/>
          <AlignLayout align={'right'}>
            <Button
              onClick={async ()=>{
                const data= this.editor.getBody();

                uiKit.loading.start();
                await replyComplain(auth, complain.id, data.body).then(response=>{
                  //ok
                  uiKit.popup.destroy();
                  uiKit.toaster.cooking('답변완료!');
                  this.componentDidMount();
                }).catch(e=>{
                  uiKit.toaster.cooking(errMsg(e));
                });
                uiKit.loading.end();
              }}
              variant={'contained'}
              color={'primary'}>
              답장
            </Button>
            &nbsp;&nbsp;
            <Button
              onClick={()=>{
                uiKit.popup.destroy();
              }}
              variant={'contained'}
              color={'secondary'}>
              닫기
            </Button>
          </AlignLayout>
        </div>
      </div>
    ), true);
  }

  render() {
    const {count, complains, filter}= this.state;
    return (
      <div>
        <PageTitle title={'문의 목록'} explain={`${count}개의 문의가 있습니다`}/>
        <br/>

        <FormControl style={{
          width: '100%',
          maxWidth: '10000px',
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
              모든 문의 보기
            </MenuItem>
            <MenuItem value={'wait'}>
              답변되지 않은 문의만
            </MenuItem>
          </Select>
        </FormControl>
        <br/><br/>
        {
          complains && complains.map(complain=>{
            if(filter==='wait' && complain.reply)
              return (<div/>);

            return (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}>
                  <div>
                    (
                    {
                      complain.reply? '답변완료': '미답변'
                    }
                    /
                    {
                      complain.author? '회원': '비회원'
                    }
                    )
                    &nbsp;
                    {fuckHTML(complain.text).slice(0, 15)}...
                    <div className={'explain'}>
                      {beautifyDate(complain.createdAt)}
                    </div>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style={{
                    width: '100%'
                  }}>
                    <div>
                      <h5>
                        문의내용
                        <p className={'explain'}>
                          {
                            complain.author? complain.author.username: complain.replyEmail
                          }
                        </p>
                      </h5>
                      <p
                        className={'reader'}
                        dangerouslySetInnerHTML={ {__html: complain.text}}/>
                    </div>
                    <div>
                      {
                        complain.reply?
                          (<div>
                            <h5>
                              답변
                              <p className={'explain'}>
                                {beautifyDate(complain.reply.createdAt)}에 답장함
                              </p>
                            </h5>
                            <p
                              className={'reader'}
                              dangerouslySetInnerHTML={ {__html: complain.reply.text}}/>
                          </div>)
                          :
                          (<AlignLayout align={'right'}>
                            <Button
                              onClick={()=>{
                                this.reply(complain);
                              }}
                              variant={'contained'}
                              color={'primary'}>
                              답변하기
                            </Button>
                          </AlignLayout>)
                      }
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        }
      </div>
    );
  }
}

export default quickConnect(Complains);