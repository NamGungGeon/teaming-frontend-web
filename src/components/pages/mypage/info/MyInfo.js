import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import ImageView from '../../../primitive/ImageView/ImageView';
import Section from '../../../primitive/Section/Section';
import { Button } from '@material-ui/core';
import { getMyProfile, uploadProfileImage } from '../../../../http/tming';
import { quickConnect } from '../../../../redux/quick';
import Form from 'reactstrap/es/Form';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import { errMsg } from '../../../../http/util';
import ImageIcon from '@material-ui/icons/Image';
import { Col, FormGroup } from 'reactstrap';
import moment from 'moment';
import Window from '../../../primitive/Window/Window';
import HashTable from '../../../primitive/HashTable/HashTable';
import { beautifyDate } from '../../../../utils/utils';

class MyInfo extends Component {
  state = {
    profile: null
  };

  async componentDidMount() {
    const { uiKit } = this.props;

    uiKit.loading.start();
    await getMyProfile(this.props.auth).then(response => {
      this.setState({
        ...this.state,
        profile: response.data
      });
    });
    uiKit.loading.end();
  }

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }

  handleProfileChange = () => {
    const { uiKit, auth } = this.props;

    //input file is changed
    const file = this.inputFile.files[0];
    const url = window.URL.createObjectURL(file);
    console.log(url);
    console.log(file);
    if (file) {
      const mb = file.size / (1024 * 1024);
      if (mb >= 1) {
        uiKit.toaster.cooking('1MB이하의 사진만 업로드 가능합니다');
        return;
      }

      //open popup
      uiKit.popup.make(
        <div>
          <h5>선택한 이미지로 프로필 사진을 변경하시겠습니까?</h5>
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContents: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <ImageView img={url} width={'128px'} height={'128px'} />
            <AlignLayout
              style={{
                flex: '1'
              }}
              align={'right'}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  //upload file
                  uiKit.loading.start();
                  await uploadProfileImage(auth, file)
                    .then(response => {
                      uiKit.toaster.cooking('업로드 완료');
                    })
                    .catch(e => {
                      uiKit.toaster.cooking(errMsg(e));
                    });
                  uiKit.loading.end();
                  uiKit.popup.destroy();

                  //reload
                  this.componentDidMount();
                }}
              >
                변경
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  uiKit.popup.destroy();
                }}
              >
                취소
              </Button>
            </AlignLayout>
          </div>
        </div>
      );
    }
  };

  render() {
    const { profile } = this.state;

    if (!profile) return <div />;

    return (
      <div>
        <PageTitle title={'내 정보'} explain={'내 기본 정보'} />
        <br />
        {profile && (
          <div>
            <Window title={'프로필 사진'}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <div>
                  <ImageView
                    img={this.state.profile.profilePicture}
                    style={{
                      width: '128px'
                    }}
                  />
                </div>
                <AlignLayout
                  style={{
                    flex: '1',
                    marginLeft: '32px'
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.inputFile.click();
                    }}
                  >
                    <ImageIcon />
                    &nbsp; 프로필 이미지 변경
                  </Button>
                </AlignLayout>
              </div>

              <Form
                style={{
                  display: 'none'
                }}
              >
                <input
                  accept="image/*"
                  type={'file'}
                  onChange={this.handleProfileChange}
                  ref={ref => {
                    this.inputFile = ref;
                  }}
                />
              </Form>
            </Window>
            <Window title={'내 정보'}>
              <div>
                <HashTable
                  table={[
                    {
                      key: '닉네임',
                      value: profile.username
                    },
                    {
                      key: '성별',
                      value: profile.gender === 'M' ? '남자' : '여자'
                    },
                    {
                      key: '가입일',
                      value: (
                        <div>
                          {beautifyDate(profile.createdAt)}
                          <br />
                          <span className={'explain'}>
                            티밍과 함께한지
                            {moment().diff(
                              moment(
                                profile.createdAt,
                                'YYYY-MM-DD[T]hh:mm:ss.SSS[Z]'
                              ),
                              'days'
                            )}
                            일 째 입니다
                          </span>
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            </Window>
          </div>
        )}
      </div>
    );
  }
}

export default quickConnect(MyInfo);
