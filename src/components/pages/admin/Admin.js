import React, { Component } from 'react';
import { authorized } from '../../../utils/utils';
import { getMyProfile } from '../../../http/tming';
import { quickConnect } from '../../../redux/quick';
import { getPath } from '../../../utils/url';
import Complains from './Complains';
import { Route } from 'react-router-dom';
import Lab from './Lab';
import Creating from './Creating';
import Reports from './Reports';

class Admin extends Component {
  state = {
    admin: false
  };

  async componentDidMount() {
    const { history, auth, uiKit, SideNavDispatcher } = this.props;

    //fuck off user!
    if (authorized(auth)) {
      uiKit.loading.start();
      await getMyProfile(auth)
        .then(response => {
          const { role } = response.data;
          if (role !== 'ADMIN') {
            uiKit.toaster.cooking('관리자만 사용할 수 있습니다');
            history.push(getPath('/'));
          } else {
            //ok, you are admin, right?
            this.setState({
              ...this.state,
              admin: true
            });
            SideNavDispatcher.set({
              '유저 관련': [
                {
                  label: '문의내역',
                  onClick: () => {
                    history.push(getPath(`/admin/complains`));
                  }
                },
                {
                  label: '컨텐츠 신고 내역',
                  onClick: () => {
                    history.push(getPath(`/admin/reports`));
                  }
                }
              ],
              '컨텐츠 관련': [
                {
                  label: '글 등록',
                  onClick: () => {
                    history.push(getPath(`/admin/creating`));
                  }
                }
              ],
              '기능 관련': [
                {
                  label: '실험실',
                  onClick: () => {
                    history.push(getPath(`/admin/lab`));
                  }
                }
              ]
            });
          }
        })
        .catch(e => {
          uiKit.loading.end();
          uiKit.toaster.cooking('관리자만 사용할 수 있습니다');
          history.push(getPath('/'));
        });
      uiKit.loading.end();
    } else {
      uiKit.toaster.cooking('관리자만 사용할 수 있습니다');
      history.push(getPath('/'));
    }
  }

  componentWillUnmount() {
    this.props.SideNavDispatcher.remove();
  }

  render() {
    const { admin } = this.state;

    return (
      <div>
        {admin && (
          <div>
            <Route
              exact
              path={getPath('/admin/complains')}
              component={Complains}
            />
            <Route exact path={getPath('/admin/lab')} component={Lab} />
            <Route
              exact
              path={getPath('/admin/creating')}
              component={Creating}
            />
            <Route exact path={getPath('/admin/reports')} component={Reports} />
          </div>
        )}
      </div>
    );
  }
}

export default quickConnect(Admin);
