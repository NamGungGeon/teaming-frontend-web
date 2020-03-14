import React, { useEffect, useState } from 'react';

const MusicPlayer = () => {
  const [musics, setMusics] = useState(null);
  useEffect(() => {
    console.log(musics);
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

  return <div></div>;
  /*
   * return (
    <Section>
      <b>승률이 올라가는 브금</b>
      <br />
      <br />
      {musics &&
        musics.map((music, index) => {
          return <MusicCard key={index} {...music} />;
        })}
      </Section>
    ); 
   */
};

export default MusicPlayer;
