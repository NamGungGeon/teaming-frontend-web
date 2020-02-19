import React, { Component } from 'react';
import Section from '../../primitive/Section/Section';
import { quickConnect } from '../../../redux/quick';
import { delay } from '../../../utils/utils';
import BoardWrapper from '../../primitive/Board/BoardWrapper/BoardWrapper';
import Window from '../../primitive/Window/Window';

class HottestPosts extends Component {
  state = {
    posts: null
  };

  async componentDidMount() {
    const { uiKit } = this.props;
    uiKit.loading.start();
    await delay(1000);
    this.setState({
      ...this.state,
      posts: [
        {
          title: 'REACT IS GOD',
          explains: ['JQUERY IS SHIT', '| 3일 전']
        },
        {
          title: 'REACT IS GOD',
          explains: ['JQUERY IS SHIT', '| 3일 전']
        },
        {
          title: 'REACT IS GOD',
          explains: ['JQUERY IS SHIT', '| 3일 전']
        },
        {
          title: 'REACT IS GOD',
          explains: ['JQUERY IS SHIT', '| 3일 전']
        }
      ]
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <Window title={'인기 게시글'}>
        {posts && <BoardWrapper boards={posts} />}
      </Window>
    );
  }
}

export default quickConnect(HottestPosts);
