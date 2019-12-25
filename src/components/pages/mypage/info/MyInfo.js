import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import ImageView from "../../../primitive/ImageView/ImageView";
import Section from "../../../primitive/Section/Section";
import {Button} from "@material-ui/core";
import {margin} from "../../../utils/utils";
import {getMyProfile, uploadProfileImage} from "../../../http/tming";
import {quickConnect} from "../../../redux";
import Form from "reactstrap/es/Form";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import {errMsg} from "../../../http/util";

class MyInfo extends Component {
  state={
    profile: '',
  }

  async componentDidMount() {
    const {uiKit}= this.props;

    uiKit.loading.start();
    await getMyProfile(this.props.auth).then(response=>{
      this.setState({
        ...this.state,
        ...response.data,
      })
    });
    uiKit.loading.end();
  }

  render() {
    const {uiKit, auth}= this.props;

    return (
      <div>
        <PageTitle title={'내 정보'} noMargin/>
        <br/>

        <Section>
          <h5>프로필 사진</h5>
          <ImageView
            img={this.state.profilePicture}
            width={'64px'}/>
          &nbsp;&nbsp;&nbsp;
          <Button
            size={'small'}
            variant="contained"
            color="primary"
            onClick={()=>{
              this.inputFile.click();
            }}>
            변경
          </Button>

          <Form style={{
            display: 'none',
          }}>
            <input
              accept="image/*"
              type={'file'}
              onChange={(e)=>{
                //input file is changed
                const file= this.inputFile.files[0];
                const url= window.URL.createObjectURL(file);
                console.log(url);
                console.log(file);
                if(file){
                  //open popup
                  uiKit.popup.make(
                    (<div>
                      <h5>선택한 이미지로 프로필 사진을 변경하시겠습니까?</h5>
                      <br/>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContents: 'space-between',
                          alignItems: 'flex-end'
                        }}>
                        <ImageView
                          img={url}
                          width={128}/>
                        <AlignLayout
                          style={{
                            flex: '1',
                          }}
                          align={'right'}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={async ()=>{
                              //upload file
                              uiKit.loading.start();
                              await uploadProfileImage(auth, file).then(response=>{
                                uiKit.toaster.cooking('업로드 완료');
                              }).catch(e=>{
                                uiKit.toaster.cooking(errMsg(e));
                              });
                              uiKit.loading.end();
                              uiKit.popup.destroy();
                            }}>
                            변경
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={()=>{
                              uiKit.popup.destroy();
                            }}>
                            취소
                          </Button>
                        </AlignLayout>
                      </div>
                    </div>)
                  );
                }
              }}
              ref={ref=> {this.inputFile= ref}}/>
          </Form>
        </Section>
        <Section>
          <h5>???</h5>
        </Section>
        <Section>
          <h5>???</h5>
        </Section>
        <Section>
          <h5>???</h5>
        </Section>
      </div>
    );
  }
}

export default quickConnect(MyInfo);