import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import styles from './RecommendYoutube.module.css';

const RecommendYoutube = ({ max }) => {
  const [youtubers, setYoutubers] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setYoutubers([
        {
          name: '윾튺버',
          profile:
            'https://img.insight.co.kr/static/2019/12/16/700/mkf94jctg8u5bvcuf576.jpg',
          desc: '정말채고의유튜버입니다',
          link: ''
        },
        {
          name: '윾튺버',
          profile:
            'https://img.insight.co.kr/static/2019/12/16/700/mkf94jctg8u5bvcuf576.jpg',
          desc: '정말채고의유튜버입니다',
          link: ''
        },
        {
          name: '윾튺버',
          profile:
            'https://img.insight.co.kr/static/2019/12/16/700/mkf94jctg8u5bvcuf576.jpg',
          desc: '정말채고의유튜버입니다',
          link: ''
        },
        {
          name: '윾튺버',
          profile:
            'https://img.insight.co.kr/static/2019/12/16/700/mkf94jctg8u5bvcuf576.jpg',
          desc: '정말채고의유튜버입니다',
          link: ''
        }
      ]);
    }, 600);
  }, []);

  if (!youtubers) return '';

  return (
    <>
      <div className={styles.cardWrapper}>
        {youtubers &&
          youtubers.map((youtuber, index) => {
            if (index > max - 1) return '';

            return (
              <Card
                onClick={() => {
                  if (youtuber.link) window.open(youtuber.link);
                }}
                key={index}
                title={youtuber.name}
              >
                <CardActionArea>
                  <CardMedia
                    style={{
                      height: '128px'
                    }}
                    image={youtuber.profile}
                    title={youtuber.name}
                  />
                  <CardContent>
                    <p>
                      <b>{youtuber.name}</b>
                      <br />
                      <br />
                      {youtuber.desc}
                    </p>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </div>
    </>
  );
};

RecommendYoutube.defaultProps = {
  max: 999999
};

export default RecommendYoutube;
