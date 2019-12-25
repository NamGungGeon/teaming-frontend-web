import React, {Component} from 'react';
import {quickConnect} from "../../../redux";
import {getNotice} from "../../../http/tming";
import {errMsg} from "../../../http/util";
import Spinner from "reactstrap/es/Spinner";
import Loading from "../../../primitive/Loading/Loading";
import LinearProgress from "@material-ui/core/LinearProgress";
import LoadingTopFixed from "../../../primitive/LoadingTopFixed/LoadingTopFixed";

class Notice extends Component {
  state={
    notice: null,
  }

  async componentDidMount() {
    const {uiKit, match}= this.props;
    const {params}= match;

    const {id}= params;
    uiKit.loading.start();
    await getNotice(id).then(response=>{
      this.setState({
        ...this.state,
        notice: response.data,
      })
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  }

  render() {
    const {notice}= this.state;
    return (
      <div>
        {
          notice?
            (<div>
              <h3>
                {notice.title}
              </h3>
              <br/>
              <p>
                {notice.text}
              </p>
            </div>):
            (<div/>)
        }
      </div>
    );
  }
}

export default quickConnect(Notice);