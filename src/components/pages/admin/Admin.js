import React, {Component} from 'react';
import {authorized} from "../../utils/utils";
import {getMyProfile} from "../../http/tming";
import {quickConnect} from "../../redux";
import {getPath} from "../../utils/url";
import uikit from "../../redux/uikit";
import Complains from "./Complains";
import {Route} from "react-router-dom";
import HorizontalNavigation from "../../containers/Navigation/HorizontalNavigation";
import lol from "../../resource/icon/lol.jpg";
import overwatch from "../../resource/icon/overwatch.png";
import battleground from "../../resource/icon/battleground.png";

class Admin extends Component {
  state={
    admin: false,
  }

  async componentDidMount() {
    const {history, auth, uiKit, SideNavDispatcher}= this.props;

    //fuck off user!
    if(authorized(auth)){
      uiKit.loading.start();
      await getMyProfile(auth).then(response=>{
        const {role}= response.data;
        if(role!== 'ADMIN'){
          uiKit.toaster.cooking('관리자만 사용할 수 있습니다');
          history.push(getPath('/'));
        }else{
          //ok, you are admin, right?
          this.setState({
            ...this.state,
            admin: true
          })
          SideNavDispatcher.set(
            (<HorizontalNavigation
              nav={{
                "유저 관련": [
                  {
                    label: '문의내역',
                    onClick: () => {
                      history.push(getPath(`/admin/complains`));
                    }
                  },
                ]}}/>)
          );
        }
      }).catch(e=>{
        uiKit.loading.end();
        uiKit.toaster.cooking('관리자만 사용할 수 있습니다');
        history.push(getPath('/'));
      });
      uiKit.loading.end();
    }else{
      uiKit.toaster.cooking('관리자만 사용할 수 있습니다');
      history.push(getPath('/'));
    }
  }

  componentWillUnmount() {
    this.props.SideNavDispatcher.remove();
  }

  render() {
    const {admin}= this.state;

    return (
      <div>
        {
          admin && (
            <div>
              <Route exact path={getPath('/admin/complains')} component={Complains}/>
            </div>
          )
        }
      </div>
    );
  }
}

export default quickConnect(Admin);