import React, { useEffect, useState } from 'react';
import { quickConnect } from '../../../redux/quick';
import { getImageSrcFromHTML, momenting } from '../../../utils/utils';
import BoardWrapper from '../../primitive/Board/BoardWrapper/BoardWrapper';
import Window from '../../primitive/Window/Window';
import { getBoardPosts } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import getHistory from 'react-router-global-history';

const HottestPosts = ({ category, uiKit }) => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    (async () => {
      uiKit.loading.start();
      await getBoardPosts(category, 4, 0, '', '', 'popular')
        .then(response => {
          const { data } = response.data;
          console.log('hottestPost', data);
          setPosts(
            data.map(post => {
              return {
                id: post.id,
                title: post.title + ` [${post.comments}]`,
                content: post.body,
                nickname: post.author ? post.author.username : '익명',
                createDate: post.createdAt,
                views: post.views
              };
            })
          );
        })
        .catch(e => {
          uiKit.toaster.cooking(errMsg(e));
        });
      uiKit.loading.end();
    })();
  }, []);

  return (
    <Window title={'인기 게시글'}>
      {posts && (
        <BoardWrapper
          boards={posts.map(post => {
            console.log(post.title, post);
            return {
              title: `${post.title}`,
              explains: [
                `닉네임: ${post.nickname}`,
                `| ${momenting(post.createDate).fromNow()}`,
                `| 조회수 ${post.views}회`
              ],
              thumbnail: getImageSrcFromHTML(post.content),
              onClick: () => {
                getHistory().push(
                  `/community/read/${post.id}?category=${
                    category ? category : ''
                  }`
                );
              }
            };
          })}
        />
      )}
    </Window>
  );
};

HottestPosts.defaultProps = {
  category: 'general'
};

export default quickConnect(HottestPosts);
