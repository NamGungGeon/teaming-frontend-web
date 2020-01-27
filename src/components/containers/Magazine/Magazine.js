import React, {Component} from 'react';
import Gallery from "../../primitive/Gallery/Gallery";
import {beautifyDate, randStr} from "../../../utils/utils";
import {quickConnect} from "../../../redux/quick";
import {getBoardPosts} from "../../../http/tming";
import {errMsg} from "../../../http/util";

class Magazine extends Component {
  state={
    count: 0,
    data: null,
  };

  componentDidMount() {
    this.loadMagazine();
  }

  loadMagazine= async ()=>{
    const {uiKit, max}= this.props;

    uiKit.loading.start();
    await getBoardPosts('MAGAZINE', false, max? max: 10, 0).then(response=>{
      const {data}= response;
      this.setState({
        ...this.state,
        ...data,
      });
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  render() {
    const {data: magazines}= this.state;
    return (
      <>
        {
          magazines && (
            <Gallery list={
              magazines.map(magazine=>{
                return {
                  title: magazine.title,
                  link: `/magazine/read/${magazine.id}`,
                  explain: `${beautifyDate(magazine.createdAt)}`,
                  img: 'https://img.resized.co/dexerto/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMjBcXFwvMDFcXFwvMDIxNjI3NTFcXFwvcmlvdC1yZXZlYWwtaWYtZHJhdmVuLXNldHQtZmF0aGVyLTEwMjR4NTc2LmpwZ1wiLFwid2lkdGhcIjo2MjAsXCJoZWlnaHRcIjozNDcsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3MzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tXFxcL3BwbHVzLmltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMTlcXFwvMTFcXFwvMTEyMTQ5NDNcXFwvcGxhY2Vob2xkZXIuanBnXCJ9IiwiaGFzaCI6ImU0OWZiODBhMjhkOTAwNzBmMGNhZDFhNDI5MWUzZjNkNzMzZWIyZGQifQ==/riot-reveal-whether-league-of-legends-champion-draven-is-sett-s-father.jpg',
                };
              })
            }/>
          )
        }
      </>
    );
  }
}

export default quickConnect(Magazine);