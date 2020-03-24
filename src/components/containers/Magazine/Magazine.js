import React, { Component } from 'react';
import Gallery from '../../primitive/Gallery/Gallery';
import { beautifyDate } from '../../../utils/utils';
import { quickConnect } from '../../../redux/quick';
import { getBoardPosts } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import Spinner from '../../primitive/Spinner/Spinner';

class Magazine extends Component {
  state = {
    count: 0,
    data: null
  };

  componentDidMount() {
    this.loadMagazine();
  }

  loadMagazine = async () => {
    const { uiKit, max } = this.props;

    uiKit.loading.start();
    await getBoardPosts('MAGAZINE', max ? max : 10, 0, 0)
      .then(response => {
        const { data } = response;
        this.setState({
          ...this.state,
          ...data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  render() {
    const { data: magazines } = this.state;
    return (
      <>
        {magazines ? (
          <Gallery
            list={magazines.map(magazine => {
              return {
                title: magazine.title,
                link: `/magazine/read/${magazine.id}`,
                explain: `${beautifyDate(magazine.createdAt)}`,
                img: magazine.thumbnail
              };
            })}
          />
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

export default quickConnect(Magazine);
