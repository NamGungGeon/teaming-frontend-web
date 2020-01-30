import React, { useEffect, useState } from 'react';
import Section from '../../primitive/Section/Section';
import MusicCard from '../../primitive/MusicCard/MusicCard';

const MusicPlayer = () => {
  const [musics, setMusics] = useState(null);
  useEffect(() => {
    console.log('MusicPlayer', 'useEffect');
    setMusics([
      {
        thumbnail: 'https://i.ytimg.com/vi/bXHfrdi_fsU/maxresdefault.jpg',
        title: '개꿀뮤직',
        tags: ['edm', 'trap', 'excited']
      },
      {
        thumbnail: 'https://i.ytimg.com/vi/bXHfrdi_fsU/maxresdefault.jpg',
        title: '개꿀뮤직',
        tags: ['edm', 'trap', 'excited']
      },
      {
        thumbnail: 'https://i.ytimg.com/vi/bXHfrdi_fsU/maxresdefault.jpg',
        title: '개꿀뮤직',
        tags: ['edm', 'trap', 'excited']
      },
      {
        thumbnail: 'https://i.ytimg.com/vi/bXHfrdi_fsU/maxresdefault.jpg',
        title: '개꿀뮤직',
        tags: ['edm', 'trap', 'excited']
      }
    ]);
  }, []);

  return (
    <Section>
      <h6>승률이 올라가는 브금</h6>
      <br />
      {musics &&
        musics.map((music, index) => {
          return <MusicCard key={index} {...music} />;
        })}
    </Section>
  );
};

export default MusicPlayer;
